import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";
import Event from './Event.js';
import Profile from './Profile.js';

class Reservation extends Model { };

Reservation.init({
    event_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Event,
            key: "id"
        }
    },
    profile_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Profile,
            key: "id"
        }
    }
},
    {
        sequelize,
        timestamps: false,
        modelName: 'Reservation',
        tableName: 'reservation',
    });

export default Reservation;