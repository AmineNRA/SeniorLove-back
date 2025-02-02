import { Model, Datatypes } from "sequelize";
import sequelize from "../config/database.js";
import DOMPurify from "dompurify";
import { JSDOM } from 'jsdom';
import User from "./User.js";

const dompurify = DOMPurify(new JSDOM('').window)

class Event extends Model { };

Event.init({
    title: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Vous devez indiquer un titre à votre évènement"
            }
        }
    },
    tag: {
        type: Datatypes.ENUM("Sortie", "Activité", "Atelier", "Rencontre", "Soirée")
    },
    description: {
        type: Datatypes.TEXT,
        allowNull: false,
        validate: {
            max: {
                args: 500,
                msg: 'La description doit avoir un maximum de 500 caractères'
            }
        }
    },
    date: {
        type: Datatypes.DATEONLY,
        allowNull: false
    },
    time: {
        type: Datatypes.TIME,
        allowNull: false
    },
    street: {
        type: Datatypes.STRING,
        allowNull: false
    },
    city: {
        type: Datatypes.STRING,
        allowNull: false
    },
    postalCode: {
        type: Datatypes.INTEGER,
        allowNull: false,
        validate: {
            min: 5,
            max: 5
        }
    },
    thumbnail_image: {
        type: Datatypes.TEXT,
        allowNull: false
    },
    full_image: {
        type: Datatypes.TEXT,
        allowNull: false
    },
    maxParticipant: {
        type: Datatypes.INTEGER,
        allowNull: false
    },
    status: {
        type: Datatypes.ENUM('scheduled', 'finished'),
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

Event.belongsTo(User);
Event.belongsToMany(User, { through: 'Reservation' })

export default Event;