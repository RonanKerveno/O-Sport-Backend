// On va récupérer tous les modèles du projet :

const Events = require('./events');
const Sports = require('./sports');
const Users = require('./users');

// Les Users peuvent participer à plusieurs évènements
Users.belongsToMany(Events, {
  as: 'events',
  through: 'users_join_events',
  foreignKey: 'event_id',
  otherKey: 'user_id',
});

// Un évènement peut avoir plusieurs participants
Events.belongsToMany(Users, {
  as: 'users',
  through: 'users_join_events',
  foreignKey: 'event_id',
  otherKey: 'user_id',
});

// les Users peuvent créer un évènement
Users.belongsTo(Events, {
  as: 'created_event',
  foreignKey: 'user_id',
});

// Un évènement est créé par un user
Events.belongsTo(Users, {
  as: 'creator',
  foreignKey: 'user_id',
});

// Un utilisateur peut avoir plusieurs sports favoris
Users.belongsToMany(Sports, {
  as: 'favorite_sport',
  through: 'users_like_sports',
  foreignKey: 'sport_id',
  otherKey: 'user_id',
});

// Un sport peut faire parti des favoris de plusieurs utilisateurs
Sports.belongsToMany(Users, {
  as: 'sports_fan',
  through: 'users_like_sports',
  foreignKey: 'sport_id',
  otherKey: 'user_id',
});

// Un évènement peut contenir plusieurs sports
Events.belongsTo(Sports, {
  as: 'sport',
  foreignKey: 'sport_id',
});

// Un sport peut contenir plusieurs évènements
Sports.hasMany(Events, {
  as: 'sport_events',
  foreignKey: 'sport_id',
});

// Pour tout exporter d'un coup :
module.exports = { Users, Events, Sports };
