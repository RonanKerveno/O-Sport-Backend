const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

class Users extends Model {}

Users.init({
  email: { type: DataTypes.STRING(127), allowNull: false },
  isAdmin: { type: DataTypes.BOOLEAN, allowNull: false },
  userName: { type: DataTypes.STRING(32), allowNull: false },
  password: { type: DataTypes.STRING(64), allowNull: false },
  lastName: { type: DataTypes.STRING(32), allowNull: false },
  firstName: { type: DataTypes.STRING(32), allowNull: false },
  region: { type: DataTypes.STRING(32), allowNull: false },
  zipCode: { type: DataTypes.STRING(32), allowNull: false },
  city: { type: DataTypes.STRING(64), allowNull: false },
  street: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.STRING(255) },
}, {
  sequelize,
  tableName: 'users',
});

module.exports = Users;
