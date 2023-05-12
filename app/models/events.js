const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

class Events extends Model {}

Events.init({
  title: { type: DataTypes.STRING, allowNull: false },
  region: { type: DataTypes.STRING, allowNull: false },
  department: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  starting_time: { type: DataTypes.DATE, allowNull: false },
  ending_time: { type: DataTypes.DATE, allowNull: false },
}, {
  sequelize,
  tableName: 'events',
});

module.exports = Events;
