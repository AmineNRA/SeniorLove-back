import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";

class Conversation extends Model { };

Conversation.init({
},
    {
        sequelize,
        modelName: 'Conversation',
        tableName: 'conversation',
        indexes: [
            {
                unique: true,
                fields: ['profile_id_1', 'profile_id_2']
            }
        ]
    });

export default Conversation;