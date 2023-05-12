const { Sequelize } = require('sequelize');
const pg = require('pg');

require('dotenv').config();


// const pgUrl = `postgres://oquiz:oquiz@localhost/oquiz`

const pgUrl = process.env.PG_URL;

const sequelize = new Sequelize(pgUrl, {
    // si on voulait faire un conversion de camelCase à snake_case
    define: {
        underscored: true
    }
});

module.exports = sequelize;

