import Profile from "../models/Profile.js";
import User from "../models/User.js"
import * as dotenv from "dotenv";
import { Op } from "sequelize";

export const profileController = {

    getProfile: async (req, res) => {
        const profile_id = req.params.id;
        try {
            const profile = await Profile.findByPk(profile_id);
            profile ?
                res.status(200).json(profile)
                :
                res.status(404).json({ message: "Aucun profil trouvé" })
        }
        catch (error) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    },

    //Controlleur de recherche de profile
    filterProfile: async (req, res) => {

        //Avec les paramètres de requete que nous envoie le front nous allons pouvoir les vérifier et les adapter en conséquence
        console.log(req.query.pseudo)
        let pseudo = req.query.pseudo ? { [Op.substring]: req.query.pseudo } : { [Op.not]: null };
        let city = req.query.city ?? { [Op.not]: null };
        let gender = req.query.gender ?? { [Op.not]: null };
        let age = req.query.age ? { [Op.between]: req.query.age.split(',').map(Number) } : { [Op.not]: null };

        try {

            //Nous pourrons ensuite appliquer les variables définies proprement pour s'adapter à toutes éventualités sur notre méthode de recherche sequelize
            const filteredProfile = await Profile.findAll({
                where: {
                    pseudo: pseudo,
                    city: city,
                    gender: gender,
                    age: age
                }
            })
            filteredProfile.length > 0 ?
                res.status(200).json(filteredProfile)
                :
                res.status(404).json({ message: 'Aucun profil trouvé' })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    },

    updateProfile: async (req, res) => {
        const { id } = req.params;
        const dataProfile = req.body;

        try {
            //On vérifie si le profile existe
            const profile = await Profile.findByPk(id);

            if (profile) {

                //On vérifie aussi si l'utilisateur à modifier son image sinon on ne le mettra pas à jour
                if (profile.profile_image == dataProfile.profile_image) {

                    let profileImageBase64 = req.body.profile_image.split(';base64,').pop();

                    const profileImageResponse = await fetch('https://api.imgbb.com/1/upload', {
                        method: 'POST',
                        body: new URLSearchParams({
                            key: process.env.CDN,
                            image: profileImageBase64
                        })
                    });

                    const profileImageData = await profileImageResponse.json();

                    dataProfile.profile_image = profileImageData.data.display_url;
                }

                const updatedProfile = await profile.update(dataProfile);

                updatedProfile ?
                    res.status(200).json(updatedProfile)
                    :
                    res.status(400).json({ message: 'Erreur sur les informations transmises' })

            }
            else {
                res.status(404).json({ message: 'Aucun profil trouvé' })
            }

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    deleteProfile: async (req, res) => {
        const { id } = req.params;
        try {
            const profile = await Profile.findOne({
                where: {
                    id: id
                },
                include: {
                    model: User,
                    attributes: ['id']
                }
            });
            if (profile) {
                const user = await User.findByPk(profile.User.id)
                const destroyedProfile = await profile.destroy();
                const destroyUser = await user.destroy();
                res.status(200).json({ response: true })
            }
            else {
                res.status(404).json({ message: "Aucun profil trouvé" })
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

}