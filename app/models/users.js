const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

class Users extends Model {}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: { type: DataTypes.STRING(127), allowNull: false },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    // Mappage isAdmin/is_admin.
    field: 'is_admin',
  },
  userName: {
    type: DataTypes.STRING(32),
    allowNull: false,
    // Mappage userName/user_name.
    field: 'user_name',
  },
  password: { type: DataTypes.STRING(64), allowNull: false },
  lastname: { type: DataTypes.STRING(32), allowNull: false },
  firstname: { type: DataTypes.STRING(32), allowNull: false },
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
