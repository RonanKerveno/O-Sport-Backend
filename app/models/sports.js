const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

class Sports extends Model {}

Sports.init({
  name: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize, // on mentionne la connexion à la BDD
  tableName: 'sports',
});

// on exporte la class directement !
module.exports = Sports;
