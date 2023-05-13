const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

class Users extends Model {}

Users.init({
  email: { type: DataTypes.STRING(127), allowNull: false },
  is_admin: { type: DataTypes.BOOLEAN, allowNull: false },
  user_name: { type: DataTypes.STRING(32), allowNull: false },
  password: { type: DataTypes.STRING(64), allowNull: false },
  last_name: { type: DataTypes.STRING(32), allowNull: false },
  first_name: { type: DataTypes.STRING(32), allowNull: false },
  region: { type: DataTypes.STRING(32), allowNull: false },
  zipcode: { type: DataTypes.STRING(32), allowNull: false },
  city: { type: DataTypes.STRING(64), allowNull: false },
  street: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.STRING(255) },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE },
}, {
  sequelize,
  tableName: 'users',
});

module.exports = Users;
