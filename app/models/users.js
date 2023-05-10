const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Users extends Model {};

Users.init({
    email : { type: DataTypes.STRING, allowNull: false},
    is_admin : { type: DataTypes.BOOLEAN, allowNull: false},
    user_name : { type: DataTypes.STRING, allowNull: false},
    password : { type: DataTypes.STRING, allowNull: false},
    last_name : { type: DataTypes.STRING, allowNull: false},
    first_name : { type: DataTypes.STRING, allowNull: false},
    description: { type: DataTypes.STRING },
    created_at : { type: DataTypes.TIMESTAMPTZ, allowNull: false},
    updated_at : { type: DataTypes.TIMESTAMPTZ }, 
  
  
  },{
    sequelize: sequelize, // on mentionne la connexion à la BDD
    tableName: "users"
  
  })

  // on exporte la class directement !
module.exports = Users;