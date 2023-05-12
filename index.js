/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const router = require('./routers');

// const userMiddleware = require('./app/middleware/user');
// const adminMiddleware = require('./app/middleware/user');

const app = express();
const port = process.env.PORT || 4000;



/*
app.use(express.urlencoded({extended: true}))

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

// app.use(express.static(path.join(__dirname, './assets')));

// JUSTE AVANT LE ROUTEUR : on utilise un middleware pour vérifier l'état de l'utilisateur

// app.use(userMiddleware);

// app.use(adminMiddleware);
router();
// app.use(router);
// const routers = require('./routers');
// routers(app);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
