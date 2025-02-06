import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";
import Event from './Event.js';
import Profile from './Profile.js';

class Reservation extends Model { };

Reservation.init({
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Event,
            key: "id"
        }
    },
    profile_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Profile,
            key: "id"
        }
    }
},
    {
        sequelize,
        modelName: 'Reservation',
        tableName: 'reservation',
    });

export default Reservation;