import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import User from "./User.js";
import Interest from "./Interest.js";

const dompurify = DOMPurify(new JSDOM('').window)

class Profile extends Model { };

Profile.init({
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
            },
            isAlphanumeric: {
                args: true,
                msg: "Le pseudo ne peut contenir de caractère spécial "
            }
        }
    },
    birthdate: {
        type: DataTypes.DATEONLY
    },
    gender: {
        type: DataTypes.ENUM('Homme', 'Femme', 'Non précisé')
    },
    lookingFor: {
        type: DataTypes.ENUM('Homme', 'Femme', 'Amitié')
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
    profile_image: {
        type: DataTypes.TEXT,
        defaultValue: '/public/img/default-avatar.webp'
    }
},
    {
        sequelize,
        modelName: 'Profile',
        tableName: 'profile'
    }
);

Profile.beforeValidate(async (profile) => {
    if (profile.description) {
        profile.description = dompurify.sanitize(profile.description)
    }
})

export default Profile;