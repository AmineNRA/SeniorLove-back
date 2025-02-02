import { Model, Datatypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

class Match extends Model { };

Match.init({
    status: {
        type: Datatypes.ENUM('pending', 'accepted', 'rejected', 'deleted'),
        defaultValue: 'pending'
    },
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
        paranoid: true,
        modelName: 'Match',
        tableName: 'match',
        indexes: [
            {
                unique: true,
                fields: ['user_id_1', 'user_id_2']
            }
        ]
    }
);

Match.belongsTo(User, { foreignKey: user_id_1 });
Match.belongsTo(User, { foreignKey: user_id_2 });

export default Match;