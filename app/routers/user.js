const router = require('express').Router();
const userCtrl = require('../controllers/user');
const authCtrl = require('../controllers/authentification');

// connexion utilisateur
router.post('/login', authCtrl.login);
// récupère tous les utilisateurs.
router.get('/', userCtrl.getAllUsers);
// récupère l’utilisateur ciblé par l’ID.
router.get('/:id', userCtrl.getOneUser);
// crée un nouvel utilisateur.
router.post('/', userCtrl.createOneUser);
// met à jour les informations de l’utilisateur ciblé par l’ID.
router.patch('/:id', userCtrl.updateOneUser);
// supprime un utilisateur ciblé par l’ID.
router.delete('/:id', userCtrl.deleteOneUser);
// récupère la liste des événements auxquels un utilisateur ayant l’ID spécifié participe.
router.get('/:id/events', userCtrl.getAllEventsFromOneUser);
// récupère la liste des événements créés par un utilisateur ayant l’ID spécifié.
router.get('/:id/created-events', userCtrl.getAllEventsCreatedByOneUser);
// ajoute un utilisateur identifié par son ID à l’événement identifié par son ID.
router.post('/:userId/events/:eventId', userCtrl.addOneUserToOneEvent);
// supprime un utilisateur identifié par son ID de l’événement identifié par son ID.
router.delete('/:userId/events/:eventId', userCtrl.deleteOneUserFromOneEvent);
// récupère la liste des sports préférés d'un utilisateur ciblé par son ID.
router.get('/:id/sports', userCtrl.getAllSportsFromOneUser);
// ajoute le sport identifié par son ID à l’utilisateur identifié par son ID.
router.post('/:userId/sports/:sportId', userCtrl.addOneSportToOneUser);
// supprime le sport identifié par son ID à l’utilisateur identifié par son ID.
router.delete('/:userId/sports/:sportId', userCtrl.deleteOneSportToOneUser);

module.exports = router;
