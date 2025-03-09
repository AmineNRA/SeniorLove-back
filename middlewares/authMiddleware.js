import jwt from "jsonwebtoken";

export default function userVerification(req, res, next) {
    try {

        const jwtToken = req.cookies["jwtToken"];
        console.log(req.cookies)
        if (!jwtToken) {
            return res.status(401).json({ message: "Non autorisé" })
        }
        else {
            jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Token invalide ou expiré' })
                }
                req.user = { id: decoded.id }
                next();
            });
        }

    }
    catch (error) {
        return res.status(401).json({ error: 'Requête non autorisée' });
    }
}