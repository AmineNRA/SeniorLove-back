import Profile from "./Profile.js";
import Event from "./Event.js";
import Reservation from "./Reservation.js";
import Conversation from "./Conversation.js";
import Interest from "./Interest.js";
import Match from "./Match.js";
import Message from "./Message.js";
import Picture from "./Picture.js";
import Conversation_Profile from "./Conversation_Profile.js";
import Match_Profile from './Match_Profile.js'
import Interest_Profile from './Interest_Profile.js'

export default function initAssociations() {
    // 1. Profile & Picutre (One-to-Many)
    Profile.hasMany(Picture,{
        foreignKey: "profile_id",
    })
    Picture.belongsTo(Profile, {
        foreignKey: "profile_id"
    });

    // 2. Event & Profile (One-to-Many pour création + Many-to-Many pour réservations)
    Profile.hasMany(Event, {
        foreignKey: "profile_id",
        as: "created_events"
    });
    Event.belongsTo(Profile, {
        foreignKey: "profile_id",
        as: "creator"
    });

    // Many-to-Many avec Reservation
    Profile.belongsToMany(Event, {
        through: 'Reservation',
        foreignKey: "profile_id",
        as: "reserved_events"
    });
    Event.belongsToMany(Profile, {
        through: 'Reservation',
        foreignKey: "event_id",
        as: "participants"
    });

    // 3. Profile & Interest (Many-to-Many)
    Profile.belongsToMany(Interest, {
        through: 'Interest_Profile',
        foreignKey: "profile_id",
        as: "interests"
    });
    Interest.belongsToMany(Profile, {
        through: 'Interest_Profile',
        foreignKey: "interest_id",
        as: "interested_profiles"
    });

    // 4. Profile & Match (Many-to-Many)
    Profile.belongsToMany(Match, {
        through: 'Match_Profile',
        foreignKey: "profile_id",
        as: "matches"
    });
    Match.belongsToMany(Profile, {
        through: 'Match_Profile',
        foreignKey: "match_id",
        as: "matched_profiles"
    });

    // 5. Profile & Conversation (Many-to-Many)
    Profile.belongsToMany(Conversation, {
        through: 'Conversation_Profile',
        foreignKey: "profile_id",
        as: "conversations"
    });
    Conversation.belongsToMany(Profile, {
        through: 'Conversation_Profile',
        foreignKey: "conversation_id",
        as: "participants"
    });

    // 6. Conversation & Message (One-to-Many)
    Conversation.hasMany(Message, {
        foreignKey: "conversation_id"
    });
    Message.belongsTo(Conversation, {
        foreignKey: "conversation_id"
    });

    // 7. Profile & Message (One-to-Many)
    Profile.hasMany(Message, {
        foreignKey: "profile_id",
        as: "sent_messages"
    });
    Message.belongsTo(Profile, {
        foreignKey: "profile_id",
        as: "sender"
    });
}