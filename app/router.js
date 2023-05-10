const express = require('express');
const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');

const adminMiddleware = require('./middleware/admin');


const router = express.Router();

router.get('/', mainController.homePage);
router.get('/quiz/:id', quizController.quizPage);
router.get('/tags', tagController.tagsPage);
router.get('/tag/:id', tagController.oneTagPage);

// affichage de la page d'inscription
router.get('/signup', userController.signupPage);
// récupération du formulaire d'inscription
router.post('/signup', userController.signupAction);

// affichage de la page de connexion
router.get('/login', userController.loginPage);
// récupération du formulaire de connexion
router.post('/login', userController.loginAction);

router.get('/profile', userController.profilePage);

router.get('/logout', userController.logOut);

// lorsque l'utilisateur  souhaitera accéder à /admin, le middleware adminMiddleware sera appelé pour vérifier que l'utilisateur a le bon rôle, si c'est le cas, on passe à l'action suivante via
router.get('/admin', adminMiddleware, adminController.adminPage);


module.exports = router;