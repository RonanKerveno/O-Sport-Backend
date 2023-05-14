/* eslint-disable import/no-unresolved */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./app/routers');
const logger = require('./app/utils/logger');

// const userMiddleware = require('./app/middleware/user');
// const adminMiddleware = require('./app/middleware/user');

const app = express();
const port = process.env.PORT || 5500;

// Middleware pour parser les body request en JSON
app.use(express.json());

// On initialise la SESSION si elle n'est pas déjà initialisée
app.use(session({
  secret: 'Guess it!', // le "secret" qui sert à générer les tokens...
  resave: true, // sauvegarde automatique de la session à la fin de la requête ?
  saveUninitialized: true, // sauvegarde de la session même si elle est vide ?
  cookie: {
    secure: false,
    maxAge: (1000 * 60 * 60), // ça fait une heure
  },
}));

app.use(express.static(path.join(__dirname, './public')));

// JUSTE AVANT LE ROUTEUR : on utilise un middleware pour vérifier l'état de l'utilisateur

// app.use(userMiddleware);
// app.use(adminMiddleware);

routes(app);

app.listen(port, () => {
  logger.log(`http://localhost:${port}`);
});
