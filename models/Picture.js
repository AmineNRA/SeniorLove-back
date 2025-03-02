import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";
import bcrypt from 'bcrypt';

class Picture extends Model { };

Picture.init({
    url: {
        type: DataTypes.TEXT,
        defaultValue: '/public/img/default-avatar.webp'
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
    {
        sequelize,
        paranoid: true,
        modelName: 'Picture',
        tableName: 'picture'
    }
);

export default Picture;
