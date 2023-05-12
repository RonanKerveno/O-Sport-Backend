const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Sports extends Model {};

Sports.init({
    name: { type: DataTypes.STRING, allowNull: false}, 
  },{
    sequelize: sequelize, // on mentionne la connexion à la BDD
    tableName: "sports"
  })

  // on exporte la class directement !
module.exports = Sports;