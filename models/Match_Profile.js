import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";
import Match from './Match.js';
import Profile from './Profile.js';

class Match_Profile extends Model { };

Match_Profile.init({
    match_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Match,
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
    },
    like: {
        type: DataTypes.ENUM('pending', 'like')
    }
},
    {
        sequelize,
        modelName: 'Match_Profile',
        tableName: 'match_profile',
    });

export default Match_Profile;