import { Model } from 'sequelize';
import sequelize from "../config/database.js";

class Conversation extends Model { };

Conversation.init({
},
    {
        sequelize,
        modelName: 'Conversation',
        tableName: 'conversation',
    });

export default Conversation;