import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";

class Match extends Model { };

Match.init({
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'deleted'),
        defaultValue: 'pending'
    }
},
    {
        sequelize,
        paranoid: true,
        modelName: 'Match',
        tableName: 'match',
        indexes: [
            {
                unique: true,
                fields: ['profile_id_1', 'profile_id_2']
            }
        ]
    }
);

export default Match;