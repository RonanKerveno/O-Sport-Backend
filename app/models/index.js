// On va récupérer tous les modèles du projet : 

const Events = require('./events');
const Sports = require('./sports');
const Users = require('./users');



// Les Users participent aux évènements

Users.hasMany(Events, {
    as: "events",
    through: "users_join_events",
    foreignKey: "event_id",
    otherKey: "user_id"
});

// lier plusieurs utilisateurs à un événement
Events.hasMany(Users, {
    as: "users",
    through: "users_join_events",
    foreignKey: "user_id",
    otherKey: "event_id"
});

// les Users créent un évènement
Users.hasMany(Events, {
    as: "events",
});


Users.hasMany(Sports, {
    as: "sports",
    through: "users_like_sports",
    foreignKey: "sport_id",
    otherKey: "user_id"
});

// pour tout exporter d'un coup :
module.exports = { Users, Events, Sports };