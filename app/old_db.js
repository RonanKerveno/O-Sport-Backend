const pg = require('pg');
require('dotenv').config();

// 2. Créer un client
const client = new pg.Client({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    database: process.env.PG_DB,
    password: process.env.PG_PASSWORD
});

//const client = new pg.Client(process.env.PG_URL);

// 3. Connecter le client
client.connect().then(console.log('Connecté !'));

// 4. Exporter le client connecté
module.exports = client;