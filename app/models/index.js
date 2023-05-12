const Events = require('./events');
const Sports = require('./sports');
const Users = require('./users');

Users.belongsToMany(Events, {
  as: 'events',
  through: 'users_join_events',
  foreignKey: 'user_id',
  otherKey: 'event_id',
  timestamps: false,
});

Events.belongsToMany(Users, {
  as: 'users',
  through: 'users_join_events',
  foreignKey: 'event_id',
  otherKey: 'user_id',
  timestamps: false,
});

Users.hasMany(Events, {
  as: 'created_events',
  foreignKey: 'id',
});

Events.belongsTo(Users, {
  as: 'creator',
  foreignKey: 'creator_id',
});

Users.belongsToMany(Sports, {
  as: 'favorite_sport',
  through: 'users_like_sports',
  foreignKey: 'user_id',
  otherKey: 'sport_id',
  timestamps: false,
});

Sports.belongsToMany(Users, {
  as: 'sports_fan',
  through: 'users_like_sports',
  foreignKey: 'sport_id',
  otherKey: 'user_id',
  timestamps: false,
});

Events.belongsTo(Sports, {
  as: 'sport',
  foreignKey: 'sport_id',
});

Sports.hasMany(Events, {
  as: 'sport_events',
  foreignKey: 'sport_id',
});

module.exports = { Users, Events, Sports };
