import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";
import User from "./User.js";
import Message from "./Message.js";

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
                fields: ['user_id_1', 'user_id_2']
            }
        ]
    });

export default Conversation;