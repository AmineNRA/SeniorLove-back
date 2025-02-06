import Message from '../models/messageModel.js';


export const messageController = {

    //Controlleur pour récupérer les messages d'une conversation
    getMessages: async (req, res) => {
        const { conversation_id } = req.params;
        try {
            const messages = await Message.findAll({
                where: { conversation_id: conversation_id },
            });
            messages ?
                res.status(200).json(messages)
                :
                res.status(404).json({ message: 'Aucun message' })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    //Controlleur pour créer un message
    createMessage: async (req, res) => {
        const dataMessage = req.body;
        try {
            const newMessage = await Message.create(dataMessage);
            newMessage ?
                res.status(201).json(newMessage)
                :
                res.status(400).json({ message: "Une erreur est survenu lors de la création du message" })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    //Controlleur pour modifier un message
    updateMessage: async (req, res) => {
        const { id } = req.params;
        const dataMessage = req.body;
        try {
            const message = await Message.findByPk(id);
            if (message) {
                const updateMessage = message.update(dataMessage);
                res.status(200).json(updateMessage);
            }
            else (
                res.status(404).json({ message: "Message introuvable" })
            )
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    //Controlleur pour supprimer un message
    deleteMessage: async (req, res) => {
        const { id } = req.params;
        try {
            const message = await Message.findByPk(id);
            if (message) {
                const deleteMessage = message.destroy()
                res.status(200).json({ message: "Message supprimé" })
            }
            else {
                res.status(400).json({ message: "Erreur lors de la suppression du message" })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

};