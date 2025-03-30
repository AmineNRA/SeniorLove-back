import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";

class Match extends Model { }

Match.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'deleted'),
        defaultValue: 'pending'
    }
}, {
    sequelize,
    modelName: 'Match',
    tableName: 'match',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Match;