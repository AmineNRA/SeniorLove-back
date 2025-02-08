import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";

class Match_Profile extends Model { };

Match_Profile.init({
    match_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'match',
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
    },
    like: {
        type: DataTypes.ENUM('pending', 'like')
    }
},
    {
        sequelize,
        modelName: 'Match_Profile',
        tableName: 'match_profile'
    });

export default Match_Profile;