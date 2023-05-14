const Events = require('./events');
const Sports = require('./sports');
const Users = require('./users');

Users.belongsToMany(Events, {
  as: 'userEvents',
  through: 'users_join_events',
  foreignKey: 'userId',
  otherKey: 'eventId',
  timestamps: false,
});

Events.belongsToMany(Users, {
  as: 'eventUsers',
  through: 'users_join_events',
  foreignKey: 'eventId',
  otherKey: 'userId',
  timestamps: false,
});

Users.hasMany(Events, {
  as: 'createdEvents',
  foreignKey: 'creatorId',
});

Events.belongsTo(Users, {
  as: 'creator',
  foreignKey: 'creatorId',
});

Users.belongsToMany(Sports, {
  as: 'favoriteSports',
  through: 'users_like_sports',
  foreignKey: 'userId',
  otherKey: 'sportId',
  timestamps: false,
});

Sports.belongsToMany(Users, {
  as: 'sportFans',
  through: 'users_like_sports',
  foreignKey: 'sportId',
  otherKey: 'userId',
  timestamps: false,
});

Events.belongsTo(Sports, {
  as: 'sport',
  foreignKey: 'sportId',
});

Sports.hasMany(Events, {
  as: 'sportEvents',
  foreignKey: 'sportId',
});

module.exports = { Users, Events, Sports };
