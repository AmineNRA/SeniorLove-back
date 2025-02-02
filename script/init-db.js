import { Conversation, Event, Interest, Match, Message, Profile, User } from "../models/associations.js";
import sequelize from "../config/database.js";

try {
    await sequelize.sync({ force: true })
}
catch (error) {
    console.log(error)
}