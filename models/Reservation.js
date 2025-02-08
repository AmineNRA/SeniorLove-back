import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";

class Reservation extends Model { };

Reservation.init({
    event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'match',
            key: 'id'
        }
    },
    profile_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'profile',
            key: 'id'
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