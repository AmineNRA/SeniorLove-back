import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";
import bcrypt from 'bcrypt';

class User extends Model { };

User.init({
    mail: {
        type: DataTypes.STRING,
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
    disabled_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    verified_at: {
        type: DataTypes.DATE,
        allowNull: true
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
