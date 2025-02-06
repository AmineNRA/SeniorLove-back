import { Op } from 'sequelize';
import Match from '../models/Match.js'

export default matchController = {

    //Controller pour trouver le match
    getMatch: async (req, res) => {
        const { profile_id } = req.params;
        try {
            const match = await Match.find({
                where: {
                    [Op.or]: [{ profile_id_1: profile_id }, { profile_id_2: profile_id }],
                    status: 'accepted',
                }
            });
            match.length > 0 ?
                res.status(200).json(match)
                :
                res.status(404).json({ message: "Aucun match trouvé" })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

} 