import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";

class Conversation_Profile extends Model { };

Conversation_Profile.init({
    conversation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'conversation',
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
        modelName: 'Conversation_Profile',
        tableName: 'conversation_profile'
    });

export default Conversation_Profile;