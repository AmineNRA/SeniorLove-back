import Profile from '../models/Profile.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const authController = {

    register: async (req, res) => {
        const profileData = req.body
        try {
            const profile = await Profile.create(profileData)
            res.status(201).json({ message: 'Utilisateur créé !' })
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    },


    login: async (req, res) => {

        const { mail, password } = req.body

        try {
            const foundProfile = await Profile.findOne({
                where: {
                    mail: mail,
                }
            })
            if (foundProfile) {

                const isMatch = await bcrypt.compare(password, foundProfile.password);

                if (!isMatch) {
                    return res.status(401).json({ message: "Mauvais couple identifiant/mot de passe" })
                }

                const accessToken = jwt.sign(
                    { id: foundProfile.id },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }
                )

                const refreshToken = jwt.sign(
                    { id: foundProfile.id },
                    process.env.JWT_SECRET,
                    { expiresIn: '7d' }
                )
                console.log(req.user)
                res.cookie("jwtToken", accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
                    maxAge: 24 * 60 * 60 * 1000
                });

                res.status(200).json({
                    id: foundProfile.id,
                    accessToken,
                    refreshToken
                })
            }
            else {
                res.status(401).json({ message: 'Utilisateur non trouvé' })
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    logout: async (req, res) => {
        res.clearCookie('jwtToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
        });

        return res.status(200).json({ message: "Déconnecté avec succès" });

    }

}