import Profile from "./Profile.js";
import Event from "./Event.js";
import Reservation from "./Reservation.js";
import Conversation from "./Conversation.js";
import Interest from "./Interest.js";
import Match from "./Match.js";
import Message from "./Message.js";
import User from "./User.js";

import Conversation_Profile from "./Conversation_Profile.js";
import Match_Profile from './Match_Profile.js'
import Interest_Profile from './Interest_Profile.js'


// One to One entre profile et user qui va créer une clé étrangère profile_id dans la table Profile
Profile.hasOne(User, { foreignKey: "profile_id" });
User.belongsTo(Profile);


// One to Many entre profile et event qui va créer une clé étrangère profile_id dans la table Event
// Profile.hasMany(Event, { foreignKey: "profile_id" });
// Event.belongsTo(Profile, { foreignKey: "profile_id" });

// Many to Many qui va créer une table de liaison entre event et profile avec une clé primaire qui aura l'association des deux id pour l'unicité
Profile.belongsToMany(Event, { through: Reservation, as: "reservedEvents" });
Event.belongsToMany(Profile, { through: Reservation, as: "participants" });

console.log("Event associations :", Event.associations);
console.log("Profile associations :", Profile.associations);
console.log("Reservation associations :", Reservation.associations);

// Many to Many qui va créer une table de liaison entre Conversation et Profile
Profile.belongsToMany(Conversation, { through: Conversation_Profile });
Conversation.belongsToMany(Profile, { through: Conversation_Profile });

//// One to Many entre message et profile qui va créer une clé étrangère profile_id dans la table Message
Profile.hasMany(Message);
Message.belongsTo(Profile, { foreignKey: "profile_id" })


// Many to Many qui va créer une table de liaison entre Match et Profile
Profile.belongsToMany(Match, { through: Match_Profile });
Match.belongsToMany(Profile, { through: Match_Profile });

// Many to Many qui va créer une table de liaison entre Profile et interest avec une clé primaire qui aura l'association des deux id pour l'unicité
Profile.belongsToMany(Interest, { through: Interest_Profile });
Interest.belongsToMany(Profile, { through: Interest_Profile });

// One to Many entre message et conversation qui va créer une clé étrangère conversation_id dans la table Message
Conversation.hasMany(Message);
Message.belongsTo(Conversation, { foreignKey: "conversation_id" })

export { Conversation, Event, Interest, Match, Message, Profile, User, Reservation, Interest_Profile, Conversation_Profile, Match_Profile };