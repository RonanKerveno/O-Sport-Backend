const { Sequelize } = require('sequelize');

const pgUrl = process.env.PG_URL;

const sequelize = new Sequelize(pgUrl, {
  // Conversion de camelCase à snake_case
  define: {
    underscored: true,
  },
});

module.exports = sequelize;
