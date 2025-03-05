import { Op } from 'sequelize';
import Match from '../models/Match.js'
import Match_Profile from '../models/Match_Profile.js';
import Profile from '../models/Profile.js';
import Picture from '../models/Picture.js';
import sequelize from '../config/database.js';

export const matchController = {

    //Controller pour trouver les matchs qui sont acceptés
    getAllMatch: async (req, res) => {
        //On va récupérer l'id du user
        const profile_id = req.user.id;

        try {
            //On va d'abord rechercher chaque ligne de match_profil qui contient notre id et juste garder l'attribut match_id
            const findMatchId = await Match_Profile.findAll({
                where: {
                    profile_id: profile_id
                },
                attributes: ['match_id'],
            });

            //Si findMatchId nous donne quelque chose
            if (findMatchId) {
                //On va créer un tableau vide matchId
                const matchId = []

                //Nous allons intégré dans la variable matchId tous les id que nous avons trouvé dans findMatchId
                findMatchId.map((element) => matchId.push(element.match_id))

                //Nous allons ensuite chercher tous les match avec les id ET le status accepté, on va inclure le profile de l'utilisateur qui n'est pas égal au profile_id avec son pseudo, son age et sa photo pour l'afficher en front
                const findMatchAccepted = await Match.findAll({
                    where: {
                        [Op.and]: [{ id: matchId }, { status: 'accepted' }]
                    },
                    include: {
                        model: Profile,
                        as: 'matched_profiles',
                        where: {
                            id: { [Op.ne]: profile_id }
                        },
                        attributes: ['pseudo', 'age'],
                        include: {
                            model: Picture,
                            attributes: ['url']
                        },
                        through: {
                            attributes: []
                        }
                    }
                });
                findMatchAccepted ?
                    res.status(200).json(findMatchAccepted)
                    :
                    res.status(404).json({ message: 'Aucun match trouvé' })
            }
            else {
                res.status(404).json({ message: "Vous n'avez encore jamais liké un profil" })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    //Controlleur pour créer un like et/ou un match
    createMatch: async (req, res) => {
        const { profile_id } = req.query;

        try {
            // 1. Vérifier si un match existe entre les deux profils
            const existingMatch = await Match.findOne({
                include: {
                    model: Profile,
                    as: 'matched_profiles',
                    attributes: ['id', 'pseudo'],
                    include: {
                        model: Picture,
                        attributes: ['url'],
                    },
                    through: { attributes: ['like'] }
                },
                where: sequelize.literal(`
                    EXISTS (
                        SELECT 1 
                        FROM "match_profile" mp
                        WHERE mp."match_id" = "Match"."id" 
                        AND mp."profile_id" = '${profile_id}'
                    )
                    AND
                    EXISTS (
                        SELECT 1 
                        FROM "match_profile" mp2
                        WHERE mp2."match_id" = "Match"."id" 
                        AND mp2."profile_id" = '${req.user.id}'
                    )
                `)
            });

            // Si un match existe cela veut dire que l'utilisateur a déjà été liké.
            if (existingMatch) {

                //Donc j'update le match pour mettre la clé like avec la valeur like
                await Match_Profile.update(
                    { like: 'like' },
                    {
                        where: {
                            match_id: existingMatch.id,
                            profile_id: req.user.id
                        }
                    }
                );
                // Je modifie aussi le match avec comme statue accepté
                await existingMatch.update({ status: 'accepted' });

                return res.status(200).json({
                    message: "C'est un match !",
                    match: existingMatch.matched_profiles.map(profile => ({
                        id: profile.id,
                        pseudo: profile.pseudo,
                        profile_image: profile.profile_image
                    }))
                });
            }

            // 2. Sinon, créer un nouveau match
            const newMatch = await Match.create();
            await Promise.all([
                Match_Profile.create({
                    match_id: newMatch.id,
                    profile_id: req.user.id,
                    like: 'like'
                }),
                Match_Profile.create({
                    match_id: newMatch.id,
                    profile_id: profile_id,
                    like: 'pending'
                })
            ]);

            res.status(201).json({
                message: "Like enregistré"
            });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    },

    deleteMatch: async (req, res) => {
        const match_id = req.query.match_id;

        try {

            const existingMatch = await Match.findByPk(match_id)

            if (existingMatch) {
                const findLike = await Match_Profile.findOne({
                    where: {
                        match_id: existingMatch.id,
                        profile_id: req.user.id
                    }
                });

                if (!findLike) {
                    return res.status(404).json({ message: "Like non trouvé" });
                }

                await Promise.all([
                    findLike.update({ like: 'pending' }),
                    existingMatch.update({ status: 'rejected' })
                ]);

                res.status(201).json({ message: 'le match est bien supprimé !' });
            } else {
                res.status(404).json({ message: 'Aucun match à supprimer' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

} 