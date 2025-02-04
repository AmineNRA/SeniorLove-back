import Event from "../models/Event";

export const eventController = {

    //Controlleur qui envoi la liste de tous les evenements
    getAllEvent: async (req, res) => {
        try {
            const events = await Event.findAll();
            events ?
                res.status(200).json(events)
                :
                res.status(404).json({ message: 'Aucun évènement encore créer' })
        } catch (error) {
            res.status(500).json({ error: error.message })
        };
    },

    //Controlleur pour envoyer un seul evenements
    getEvent: async (req, res) => {
        const { id } = req.params
        try {
            const event = await Event.findByPk(id);
            event ?
                res.status(200).json(event)
                :
                res.status(404).json({ message: 'Aucun évènement trouvé' })
        } catch (error) {
            res.status(500).json({ error: error.message })
        };
    },

    //Controlleur pour créer un evenement EN ATTENT DE CREATION SCRIPT BASE64
    // createEvent: async (req, res) => {
    //     const dataEvent = req.body
    //     try {
    //         const newEvent = await Event.create(dataEvent)
    //         newEvent ?
    //             res.status(201).json(newEvent)
    //             :
    //             res.status(400).json({ message: "Une erreur est survenu lors de la création de l'évènement" })
    //     } catch (error) {
    //         res.status(500).json({ error: error.message })
    //     }
    // },

}