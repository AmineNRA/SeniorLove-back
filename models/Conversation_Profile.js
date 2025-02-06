import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";
import Conversation from './Conversation.js';
import Profile from './Profile.js';

class Conversation_Profile extends Model { };

Conversation_Profile.init({
    conversation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Conversation,
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
        modelName: 'Conversation_Profile',
        tableName: 'conversation_profile',
    });

export default Conversation_Profile;