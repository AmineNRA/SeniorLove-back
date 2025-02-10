import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const dompurify = DOMPurify(new JSDOM('').window)

class Message extends Model { };

Message.init({
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Vous ne pouvez envoyer un message vide"
            }
        }
    },
    status: {
        type: DataTypes.ENUM('unread', 'read', 'deleted'),
        defaultValue: 'unread'
    }
},
    {
        sequelize,
        modelName: 'Message',
        tableName: 'message',
        timestamps: true,
        underscored: true
    }
);

Message.beforeValidate(async (message) => {
    message.description = dompurify.sanitize(message.content)
    0
});

export default Message;