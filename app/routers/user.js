const router = require('express').Router();
const userCtrl = require('../controllers/user');

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
router.get('/:user_id/events', userCtrl.getAllEventsFromOneUser);
// ajoute un utilisateur identifié par son ID à l’événement identifié par son ID.
router.post('/:users_id/events/:event_id', userCtrl.addOneUserToOneEvent);
// supprime un utilisateur identifié par son ID de l’événement identifié par son ID.
router.delete('/:user_id/events/:event_id', userCtrl.deleteOneUserFromOneEvent);
// récupère la liste des sports préférés d'un utilisateur ciblé par son ID.
router.get('/:user_id/sports', userCtrl.getAllSportsFromOneUser);
// ajoute le sport identifié par son ID à l’utilisateur identifié par son ID.
router.post('/:user_id/sports/:sport_id', userCtrl.addOneSportToOneUser);
// supprime le sport identifié par son ID à l’utilisateur identifié par son ID.
router.delete('/:user_id/sports/:sport_id', userCtrl.deleteOneSportToOneUser);

module.exports = router;
