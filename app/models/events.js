const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Events extends Model {}

Events.init({
  author: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  region: { type: DataTypes.STRING, allowNull: false },
  department: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  starting_time: { type: DataTypes.DATE, allowNull: false },
  ending_time: { type: DataTypes.DATE, allowNull: false },
  created_at: { type: DataTypes.DATE, allowNull: false },
  updated_at: { type: DataTypes.DATE },

}, {
  sequelize, // on mentionne la connexion à la BDD
  tableName: 'events',

});

// on exporte la class directement !
module.exports = Events;
