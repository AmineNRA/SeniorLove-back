import Message from '../models/Message.js';
import Conversation from '../models/Conversation.js';
import Conversation_Profile from '../models/Conversation_Profile.js';


export const messageController = {

    //Controlleur pour créer un message
    createMessage: async (req, res) => {
        const dataMessage = req.body;

        try {
            //On va vérifie si conversation n'est pas égale à 0
            if (dataMessage.conversation_id != 0) {

                //Si c'est le cas nous allons créer le message tout simplement
                const newMessage = await Message.create({
                    content: dataMessage.content,
                    profile_id: req.user.id,
                    conversation_id: dataMessage.conversation_id
                });
                newMessage ?
                    res.status(201).json(newMessage)
                    :
                    res.status(400).json({ message: "Une erreur est survenu lors de la création du message" })
            }
            else {
                //Sinon ca veut dire que la conversation n'existe pas encore et là on va créer la conversation, les lignes sur notre table de jointure et le nouveau message
                const newConversation = await Conversation.create();

                await Promise.all([
                    Conversation_Profile.create({
                        conversation_id: newConversation.id,
                        profile_id: req.user.id
                    }),
                    Conversation_Profile.create({
                        conversation_id: newConversation.id,
                        profile_id: dataMessage.profile_id
                    })
                ])

                const newMessage = await Message.create({
                    content: newConversation.id,
                    profile_id: req.user.id,
                    conversation_id: dataMessage.conversation_id
                })

                res.status(201).json({ newMessage })
            }
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