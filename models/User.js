import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";
import bcrypt from 'bcrypt';
import Profile from './Profile.js';
import Event from "./Event.js";
import Conversation from "./Conversation.js";
import Message from "./Message.js";
import Match from "./Match.js";

class User extends Model { };

User.init({
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: "L'email n'est pas valide"
            },
            notEmpty: {
                args: true,
                msg: "Vous devez renseigner une adresse mail"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    disabledAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    verifiedAt: {
        type: DataTypes.DATE
    }
},
    {
        sequelize,
        paranoid: true,
        modelName: 'User',
        tableName: 'user'
    }
);

User.beforeCreate(async (user) => {
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
});

export default User;
