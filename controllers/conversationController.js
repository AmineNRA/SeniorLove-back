import Conversation from "../models/Conversation.js";
import { Op } from "sequelize";

export const conversationController = {

    //Controlleur pour chercher la liste des conversations ou l'utilisateur est impliqué
    getConversation: async (req, res) => {
        const { profile_id } = req.params
        try {
            const conversation = await Conversation.findAll({
                where: {
                    [Op.or]: [{ profile_id_1: profile_id }, { profile_id_2: profile_id }]
                },
            });
            conversation ?
                res.status(200).json(conversation)
                :
                res.status(404).json({ message: "Aucune conversation" })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    //Controlleur qui va supprimer une conversation par rapport à son id
    deleteConversation: async (req, res) => {
        const { id } = req.params
        try {
            const conversation = await Conversation.findByPk(id);
            if (conversation) {
                conversation.destroy();
                res.status(200).json({ message: "Réservation supprimée" });
            }
            else {
                res.status(404).json({ message: "Impossible de supprimer la réservation" })
            };
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}