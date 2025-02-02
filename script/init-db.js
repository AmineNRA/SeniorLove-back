import Conversation from "../models/Conversation.js";
import Event from "../models/Event.js";
import Interest from "../models/Interest.js";
import Match from "../models/Match.js";
import Message from "../models/Message.js";
import Profile from "../models/Profile.js";
import User from "../models/User.js";

try {
    await sequelize.sync({ force: true })
}
catch (error) {
    console.log(error)
}