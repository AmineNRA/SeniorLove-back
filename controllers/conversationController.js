import Conversation from "../models/Conversation.js";
import Profile from "../models/Profile.js";
import Conversation_Profile from "../models/Conversation_Profile.js";
import Message from "../models/Message.js";
import { Op } from "sequelize";
import sequelize from "../config/database.js";

export const conversationController = {

    //Controlleur pour chercher la liste des conversations ou l'utilisateur est impliqué
    getAllConversation: async (req, res) => {
        const { profile_id } = req.params
        try {

            //On va recherche toutes les conversations qui sont liés à un profile_id grace à la table de liaison, on va récupérer le profile du partcipants qui n'est pas notre profile_id et ajouter le dernier message de cette conversation.
            const allConversation = await Conversation.findAll({
                attributes: ['id'],
                include: [
                    {
                        model: Profile,
                        as: 'participants',
                        attributes: ['pseudo', 'profile_image'],
                        where: {
                            id: { [Op.ne]: profile_id }
                        },
                        through: { attributes: [] },

                    },
                    {
                        model: Message,
                        attributes: ['content'],
                        order: [['created_at', 'DESC']],
                        limit: 1,
                    }
                ],
                where: {
                    id: {
                        [Op.in]: sequelize.literal(`(
                                SELECT conversation_id FROM conversation_profile WHERE profile_id = ${profile_id}
                            )`)
                    }
                },
            });
            //Si on trouve quelque chose
            if (allConversation.length > 0) {
                //On va formater le résultat pour une simplicité d'utilisation coté front
                const formattedConversations = allConversation.map(conv => ({
                    id: conv.id,
                    participant: {
                        pseudo: conv.participants[0].pseudo,
                        profile_image: conv.participants[0].profile_image,
                    },
                    lastMessage: conv.Messages[0].content
                }));

                //On va envoyer le résultat
                res.status(200).json(formattedConversations)
            }
            else {
                res.status(404).json({ message: 'Aucune conversation' })
            };
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    getConversation: async (req, res) => {
        const { user_id, profile_id } = req.query;

        //On va vérifier si une conversation existe entre les deux
        const conversation = await Conversation.findOne({
            attributes: ['id'],
            include:
            {
                model: Message,
                attributes: ['content', 'created_at', 'status'],
                order: [['created_at', 'DESC']],
                include: {
                    model: Profile,
                    as: "sender",
                    attributes: ['id', 'pseudo', 'profile_image']
                }
            },
            where: sequelize.literal(`
                EXISTS (
                    SELECT 1 
                    FROM "conversation_profile" cp
                    WHERE cp."conversation_id" = "Conversation"."id" 
                    AND cp."profile_id" = ${profile_id}
                )
                AND
                EXISTS (
                    SELECT 1 
                    FROM "conversation_profile" cp2
                    WHERE cp2."conversation_id" = "Conversation"."id" 
                    AND cp2."profile_id" = ${user_id}
                )
            `),
        });
        // Si c'est le cas
        if (conversation) {
            //On formate la réponse pour le front
            const formattedConversation = {
                id: conversation.id,
                Messages: conversation.Messages.map(message => ({
                    content: message.content,
                    status: message.status,
                    created_at: message.dataValues.created_at,
                    id_profile: message.sender.id,
                    pseudo: message.sender.pseudo,
                    profile_image: message.sender.profile_image
                })
                )
            };

            res.status(200).json(formattedConversation)
        }
        //Sinon on envoie conversation_id:0
        else {
            res.status(200).json({ conversation_id: 0 })
        }
    },

    //Controlleur qui va supprimer une conversation par rapport à son id
    deleteConversation: async (req, res) => {
        const { id } = req.params
        try {
            const conversation = await Conversation.findByPk(id);
            if (conversation) {
                conversation.destroy();
                res.status(200).json({ message: "Conversation supprimé" });
            }
            else {
                res.status(404).json({ message: "Impossible de supprimer la conversation" })
            };
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}