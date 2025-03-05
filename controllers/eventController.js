import Event from "../models/Event.js";
import Profile from "../models/Profile.js"
import Reservation from "../models/Reservation.js"
import Picture from "../models/Picture.js";
import imagesServices from "../services/imagesServices.js";
import { Op } from "sequelize";

export const eventController = {

    //Controlleur qui envoi la liste de tous les evenements
    getAllEvent: async (req, res) => {
        let tag = req.query.tag ?? { [Op.not]: null };
        let date = req.query.date ?? { [Op.not]: null };

        try {
            const event = await Event.findAll({
                attributes: ['id', 'title', 'tag', 'description', 'thumbnail_image'],
                where: {
                    tag: tag,
                    date: date
                }
            })
            event.length > 0 ?
                res.status(200).json(event)
                :
                res.status(404).json({ message: 'Aucun évènement trouvé' })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    },

    //Controlleur pour envoyer un seul evenements, on récupères avec les réservations pour les afficher sur la page Event Detail de notre front
    getEvent: async (req, res) => {
        const event_id = req.params.id
        try {
            const oneEvent = await Event.findOne({
                where: {
                    id: event_id
                },
                include: [{
                    model: Profile,
                    as: "participants",
                    attributes: ['pseudo'],
                    through: {
                        attributes: []
                    },
                    include: {
                        model: Picture,
                    },
                },
                {
                    model: Profile,
                    as: "creator",
                    attributes: ['pseudo']
                }
                ]
            })
            oneEvent ?
                res.status(200).json(oneEvent)
                :
                res.status(404).json({ message: 'Aucun évènement trouvé' })


        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    },

    //Controlleur pour créer un evenement
    createEvent: async (req, res) => {

        //Récupération des infos envoyé du front
        const dataEvent = req.body
        dataEvent.profile_id = req.query.id

        try {

            //Récupération de l'image en base64 et on enlève le début qui défini le type
            let fullImageBase64 = req.body.full_image.split(';base64,').pop();

            // Utilisation de la fonction imagesServices pour modifier l'images pour la photo thumbnail et aussi pour envoyer à notre cdn
            const urlImages = await imagesServices(fullImageBase64, "event", 0)

            // Ajout des réponses dans l'objet dataEvent
            dataEvent.full_image = urlImages.fullImageResponse;
            dataEvent.thumbnail_image = urlImages.thumbnailResponse;

            // On créer l'évènement avec l'objet dataEvent qui comporte maintenant tout ce qu'il nous faut
            const newEvent = await Event.create(dataEvent);

            //Création de l'event du profile qui a créer l'évènement
            const newReservation = await Reservation.create({
                event_id: newEvent.id,
                profile_id: newEvent.profile_id
            })

            newEvent ?
                //Juste besoin d'envoyer l'id pour que le front navigue directement sur la page de l'evenement
                res.status(201).json(newEvent.id)
                :
                res.status(400).json({ message: "Une erreur est survenu lors de la création de l'évènement" })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    updateEvent: async (req, res) => {
        const { id } = req.params;
        const dataEvent = req.body;
        try {
            const event = await Event.findByPk(id);
            if (event) {
                const updatedEvent = await event.update(dataEvent);
                res.status(200).json(updatedEvent)
            } else {
                res.status(404).json({ message: 'Aucun évènement trouvé' })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    deleteEvent: async (req, res) => {
        const { id } = req.params;
        try {
            const event = await Event.findByPk(id);
            if (event) {
                const destroyedEvent = await event.destroy();
                res.status(200).json({ message: 'Evènement supprimé' });
            }
            else {
                res.status(404).json({ message: 'Aucun évènement trouvé' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

}