const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

class Sports extends Model {}

Sports.init({
  name: { type: DataTypes.STRING, allowNull: false },

}, {
  sequelize, // on mentionne la connexion à la BDD
  tableName: 'sports',
  // on empêche Sequelize d'essayer d'inclure les colonnes created_at et updated_at car
  // la table n'en a pas.
  timestamps: false,
});

// on exporte la class directement !
module.exports = Sports;
