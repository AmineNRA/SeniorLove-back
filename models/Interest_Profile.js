import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";
import Interest from './Interest.js';
import Profile from './Profile.js';

class Interest_Profile extends Model { };

Interest_Profile.init({
    interest_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Interest,
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
        modelName: 'Interest_Profile',
        tableName: 'interest_profile',
    });

export default Interest_Profile;