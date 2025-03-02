import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import bcrypt from "bcrypt";

const dompurify = DOMPurify(new JSDOM('').window)

class Profile extends Model { };

Profile.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
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
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Vous devez indiquer un pseudo"
            },
            len: {
                args: [4, 16],
                msg: "Le pseudo doit être compris entre 4 et 16 caractères"
            }
        }
    },
    age: {
        type: DataTypes.INTEGER
    },
    gender: {
        type: DataTypes.ENUM('Homme', 'Femme', 'Non précisé')
    },
    looking_for: {
        type: DataTypes.ENUM('Homme', 'Femme', 'Amitié'),
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'Vous devez renseigner le nom de votre ville'
            }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            max: {
                args: 500,
                msg: 'La description doit avoir un maximum de 500 caractères'
            }
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
        modelName: 'Profile',
        tableName: 'profile'
    }
);

Profile.beforeCreate(async (user) => {
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
});

Profile.beforeValidate(async (profile) => {
    if (profile.description) {
        profile.description = dompurify.sanitize(profile.description)
    }
})



export default Profile;