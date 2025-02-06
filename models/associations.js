import Conversation from "./Conversation.js";
import Event from "./Event.js";
import Interest from "./Interest.js";
import Match from "./Match.js";
import Message from "./Message.js";
import Profile from "./Profile.js";
import User from "./User.js";


// One to One entre profile et user qui va créer une clé étrangère profile_id dans la table Profile
Profile.hasOne(User, { foreignKey: "profile_id" });
User.belongsTo(Profile);


// One to Many entre profile et event qui va créer une clé étrangère profile_id dans la table Event
Profile.hasMany(Event);
Event.belongsTo(Profile, { foreignKey: "profile_id" });

// Many to Many qui va créer une table de liaison entre event et profile avec une clé primaire qui aura l'association des deux id pour l'unicité
Profile.belongsToMany(Event, { through: 'reservation', foreignKey: "profile_id" });
Event.belongsToMany(Profile, { through: 'reservation', foreignKey: "event_id" })

// Many to Many qui va créer une table de liaison entre Conversation et Profile
Profile.belongsToMany(Conversation, { through: 'conversation_profile' });
Conversation.belongsToMany(Profile, { through: 'conversation_profile' });

//// One to Many entre message et profile qui va créer une clé étrangère profile_id dans la table Message
Profile.hasMany(Message);
Message.belongsTo(Profile, { foreignKey: "profile_id" })


// Many to Many qui va créer une table de liaison entre Match et Profile
Profile.belongsToMany(Match, { through: 'match_profile' });
Match.belongsToMany(Profile, { through: 'match_profile' });

// Many to Many qui va créer une table de liaison entre Profile et interest avec une clé primaire qui aura l'association des deux id pour l'unicité
Profile.belongsToMany(Interest, { through: 'profile_interest', foreignKey: "profile_id" });
Interest.belongsToMany(Profile, { through: 'profile_interest', foreignKey: "interest_id" });

// One to Many entre message et conversation qui va créer une clé étrangère conversation_id dans la table Message
Conversation.hasMany(Message);
Message.belongsTo(Conversation, { foreignKey: "conversation_id" })

export { Conversation, Event, Interest, Match, Message, Profile, User };