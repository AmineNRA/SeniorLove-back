import { Model, Datatypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";
import Message from "./Message.js";

class Conversation extends Model { };

Conversation.init({
    user_id_1: {
        type: Datatypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false,
    },
    user_id_2: {
        type: Datatypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false,
    }
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

Conversation.belongsTo(User, { foreignKey: user_id_1 });
Conversation.belongsTo(User, { foreignKey: user_id_2 });

Conversation.belongsTo(Message)


export default Conversation;