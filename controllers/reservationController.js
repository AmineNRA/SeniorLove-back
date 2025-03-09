import Reservation from '../models/Reservation.js'
import Event from '../models/Event.js'

export const reservationController = {
    createReservation: async (req, res) => {
        const event_id = req.params.event_id;

        try {
            const event = await Event.findByPk(event_id);
            if (!event) {
                return res.status(404).json({ success: false });
            }

            const reservation = await Reservation.create({
                event_id: event_id,
                profile_id: req.user.id
            });

            if (reservation) {
                return res.status(201).json({ success: true });
            }

        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    deleteReservation: async (req, res) => {
        const event_id = req.params.event_id;

        try {
            const deleteReservation = await Reservation.destroy({
                where: {
                    event_id: event_id,
                    profile_id: req.user.id
                }
            });

            if (deleteReservation === 0) {
                return res.status(404).json({ success: false });
            }

            return res.status(200).json({ success: true });

        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};