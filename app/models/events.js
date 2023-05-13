const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

class Events extends Model {}

Events.init({
  title: { type: DataTypes.STRING(64), allowNull: false },
  region: { type: DataTypes.STRING(32), allowNull: false },
  zipCode: { type: DataTypes.STRING(32), allowNull: false },
  city: { type: DataTypes.STRING(64), allowNull: false },
  street: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.STRING(500) },
  startingTime: { type: DataTypes.DATE, allowNull: false },
  endingTime: { type: DataTypes.DATE, allowNull: false },
}, {
  sequelize,
  tableName: 'events',
});

module.exports = Events;
