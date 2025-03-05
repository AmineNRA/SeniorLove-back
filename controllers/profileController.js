import Profile from "../models/Profile.js";
import Match_Profile from "../models/Match_Profile.js";
import Interest_Profile from "../models/Interest_Profile.js";
import Interest from "../models/Interest.js"
import Picture from "../models/Picture.js";
import { Op } from "sequelize";
import sequelize from "../config/database.js";
import imagesServices from "../services/imagesServices.js";
import interestServices from "../services/interestServices.js";

export const profileController = {

    //Controller pour afficher le profil que le user consulte avec toutes les infos.
    getProfile: async (req, res) => {
        const profile_id = req.query.profile_id ? req.query.profile_id : req.user.id;
        const user_id = req.user.id;
        try {

            // Vérification pour savoir si le user a déjà liké ou non le profil
            const likeStatus = await Match_Profile.findOne({
                attributes: ['like'],
                where: {
                    profile_id: user_id,
                    match_id: {
                        [Op.in]: sequelize.literal(`(
                            SELECT match_id
                            FROM match_profile
                            WHERE profile_id = ${profile_id}
                            )`)
                    }
                }
            })

            // Récupération des infos du profil consulté
            const profile = await Profile.findOne({
                where: { id: profile_id },
                include: [{
                    model: Picture,
                    where: { profile_id: profile_id },
                },
                {
                    model: Interest,
                    as: "interests",
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }

                }
                ]
            });

            const interest = await interestServices(profile_id)

            // Nous allons formaté l'objet que nous allons envoyer au front. Nous utilisons les opération optionnel (?.) pour ne pas avoir d'erreur si aucun interet ou like existe
            const formattedProfile = {
                id: profile.id,
                pseudo: profile.pseudo,
                profile_image: profile.Pictures[0].first,
                age: profile.age,
                looking_for: profile.looking_for,
                city: profile.city,
                description: profile.description,
                interests: interest,
                like: likeStatus?.like || null
            }
            profile ?
                res.status(200).json(formattedProfile)
                :
                res.status(404).json({ message: "Aucun profil trouvé" })
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //Controlleur de recherche de profile
    filterProfile: async (req, res) => {
        //Avec les paramètres de requete que nous envoie le front nous allons pouvoir les vérifier et les adapter en conséquence
        let pseudo = req.query.pseudo ? { [Op.substring]: req.query.pseudo } : { [Op.not]: null };
        let city = req.query.city ?? { [Op.not]: null };
        let gender = req.query.gender ?? { [Op.not]: null };
        let age = req.query.age ? { [Op.between]: req.query.age.split(',').map(Number) } : { [Op.not]: null };

        try {

            //Nous pourrons ensuite appliquer les variables définies proprement pour s'adapter à toutes éventualités sur notre méthode de recherche sequelize
            const filteredProfile = await Profile.findAll({
                where: {
                    id: { [Op.ne]: req.user.id },
                    pseudo: pseudo,
                    city: city,
                    gender: gender,
                    age: age
                },
                include: [{
                    model: Picture,
                }],
            })
            //Comme précédemment je vais formater le résultat pour envoyer que ce que le front a besoin.
            const formattedProfiles = filteredProfile.map(profile => ({
                id: profile.id,
                pseudo: profile.pseudo,
                age: profile.age,
                image_profile: profile.Pictures[0].url
            }))

            formattedProfiles.length > 0 ?
                res.status(200).json(formattedProfilesw)
                :
                res.status(404).json({ message: 'Aucun profil trouvé' })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    },


    updateProfile: async (req, res) => {
        const id = req.user.id
        const profileData = req.body

        try {

            // On cherche le profil de l'utilisateur
            const profile = await Profile.findByPk(id)

            // Si le user veut modifier une de ces images on va lancer notre function imagesServices et delete la propriété pictures de l'objet
            if (profileData.pictures != undefined && profileData?.pictures.length > 0) {
                imagesServices(profileData.pictures, 'profile', id)
                delete profileData.pictures
            }

            //On va mettre à jour le profil
            const updatedProfile = await profile.update(profileData)

            //Et envoyer un booléen true pour le front
            res.status(200).json({ bool: true });
        } catch (error) {
            res.status(500).json({ error: error.message })
        }



    },


    deleteProfile: async (req, res) => {
        const id = req.user.id;
        try {
            //Suppression du profil
            await Profile.destroy({
                where: { id: id }
            });

            //Suppression des images
            await Picture.destroy({
                where: { profile_id: id }
            })

            //Des interets du profil
            await Interest_Profile.destroy({
                where: { profile_id: id }
            });

            //Des Match du profil
            await Match_Profile.destroy({
                where: { profile_id: id }
            });

            res.status(200).json({ bool: true })

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

}