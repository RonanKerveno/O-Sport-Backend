const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

class Users extends Model {}

Users.init({
  email: { type: DataTypes.STRING, allowNull: false },
  is_admin: { type: DataTypes.BOOLEAN, allowNull: false },
  user_name: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  first_name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
}, {
  sequelize,
  tableName: 'users',
});

module.exports = Users;
