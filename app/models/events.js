const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

class Events extends Model {}

Events.init({
  title: { type: DataTypes.STRING(64), allowNull: false },
  region: { type: DataTypes.STRING(32), allowNull: false },
  zipcode: { type: DataTypes.STRING(32), allowNull: false },
  city: { type: DataTypes.STRING(64), allowNull: false },
  street: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.STRING(500) },
  starting_time: { type: DataTypes.DATE, allowNull: false },
  ending_time: { type: DataTypes.DATE, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE },
}, {
  sequelize,
  tableName: 'events',
});

module.exports = Events;
