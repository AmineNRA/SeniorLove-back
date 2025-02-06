import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const dompurify = DOMPurify(new JSDOM('').window)

class Event extends Model { };

Event.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Vous devez indiquer un titre à votre évènement"
            }
        }
    },
    tag: {
        type: DataTypes.ENUM("Sortie", "Activité", "Atelier", "Rencontre", "Soirée")
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            max: {
                args: 500,
                msg: 'La description doit avoir un maximum de 500 caractères'
            }
        }
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postal_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 5
        }
    },
    thumbnail_image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    full_image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    max_participant: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('scheduled', 'finished'),
        defaultValue: 'scheduled'
    }
},
    {
        sequelize,
        modelName: 'Event',
        tableName: 'event'
    }
);

Event.beforeValidate(async (event) => {
    event.description = dompurify.sanitize(event.description)
    0
});

export default Event;