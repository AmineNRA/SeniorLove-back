import Event from "../models/Event.js";
import Reservation from "../models/Reservation.js";
import Profile from "../models/Profile.js"
import Match from "../models/Match.js";
import Match_Profile from "../models/Match_Profile.js";

export const eventController = {

    //Controlleur qui envoi la liste de tous les evenements
    getAllEvent: async (req, res) => {
        try {
            const createMatch = await Match.create();
            const test = await Match_Profile.bulkCreate([{ match_id: createMatch.id, profile_id: 1, like: 'like' }, { match_id: createMatch.id, profile_id: 2, like: 'pending' }])
            console.log('le match créé:', createMatch)
            console.log("les likes créés:", test)
            // const events = await Event.findAll();
            // Doit afficher les participants
            //     res.status(200).json(events)
            //     :
            //     res.status(404).json({ message: 'Aucun évènement encore créer' })
        } catch (error) {
            res.status(500).json({ error: error.message })
        };
    },

    //Controlleur pour envoyer un seul evenements
    getEvent: async (req, res) => {
        console.log(Event.associations, 'association event')
        console.log(Profile.associations, 'association profile')
        console.log(Reservation.associations, 'association réservation')
        const { id } = req.params
        try {
            const test = await Event.findOne({
                where: { id: 1 },
                include: [{ model: Profile, as: "participants" }]
            });
            console.log(test)

            // const event = await Event.findOne({
            //     where: {
            //         id: id
            //     },
            //     include: {
            //         model: Profile,
            //         through: { model: Reservation }
            //     }
            // });
            // event ?
            //     res.status(200).json(event)
            //     :
            //     res.status(404).json({ message: 'Aucun évènement trouvé' })
        } catch (error) {
            res.status(500).json({ error: error.message })
        };
    },

    //Controlleur pour créer un evenement EN COURS
    createEvent: async (req, res) => {

        //Récupération des infos envoyé du front
        const dataEvent = req.body
        // Il faudra ici mettre la modification de l'image pour le format thumbnail_image
        //Fetch pour envoyer l'image sur le cdn
        const response = await fetch('https://api.imgdb.com/1/upload', {
            method: 'POST',
            body: new URLSearchParams({
                key: '3ad8b2f9cfa6cc3938e229980a1044a1',
                image: dataEvent.full_image
            })
        });

        //Récupération de l'objet que nous envoie le cdn pour remplacer l'image en base64 par le lien d'accès à l'image
        const data = await response.json();
        dataEvent.full_image = data.display_url;

        try {
            const newEvent = await Event.create(dataEvent);
            newEvent ?
                res.status(201).json(newEvent)
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