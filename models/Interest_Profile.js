import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";

class Interest_Profile extends Model { };

Interest_Profile.init({
    interest_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'interest',
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
        modelName: 'Interest_Profile',
        tableName: 'interest_profile'
    });

export default Interest_Profile;