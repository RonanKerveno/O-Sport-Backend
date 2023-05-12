const { Sequelize } = require('sequelize');
// eslint-disable-next-line no-unused-vars
const pg = require('pg');

// const pgUrl = `postgres://oquiz:oquiz@localhost/oquiz`

const pgUrl = process.env.PG_URL;

const sequelize = new Sequelize(pgUrl, {
  // si on voulait faire un conversion de camelCase à snake_case
  define: {
    underscored: true,
  },
});

module.exports = sequelize;
