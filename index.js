require('dotenv').config();

const path = require('path');
const express = require('express');
const router = require('./app/routers');
const session = require('express-session');

const userMiddleware = require('./app/middleware/user');
const adminMiddleware = require('./app/middleware/user');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({extended: true}))

/*
// On initialise la SESSION si elle n'est pas déjà initialisée
app.use(session({
   secret: "Guess it!", // le "secret" qui sert à générer les tokens...
   resave: true, // sauvegarde automatique de la session à la fin de la requête ?
   saveUninitialized: true, // sauvegarde de la session même si elle est vide ?
   cookie: {
      secure: false,
      maxAge: (1000 * 60 * 60) // ça fait une heure
   }
}));
// */
// 

// app.use(express.static(path.join(__dirname, './assets')))

// JUSTE AVANT LE ROUTEUR : on utilise un middleware pour vérifier l'état de l'utilisateur

app.use(userMiddleware);

app.use(adminMiddleware);

app.use(router);

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});






