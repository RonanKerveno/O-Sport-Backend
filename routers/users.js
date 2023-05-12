const router = require('express').Router();
const usersController = require('../app/controllers/usersController');

console.log('user');
// récupère tous les utilisateurs.
router.get('/', usersController.getAllUsers);
/*
// récupère l’utilisateur ciblé par l’ID.
router.get('/:id', usersController.getOneUser)
//crée un nouvel utilisateur.
router.post('/',usersController.createOneUser)
//met à jour les informations de l’utilisateur ciblé par l’ID.
router.patch('/:id', usersController.updateOneUser)
//supprime un utilisateur ciblé par l’ID.
router.delete('/:id', usersController.deleteOneUser)
//récupère la liste des événements auxquels un utilisateur ayant l’ID spécifié participe.
router.get('/:user_id/events',usersController.getAllEventsFromOneUser)
// ajoute un utilisateur identifié par son ID à l’événement identifié par son ID.
router.post('/:users_id/events/:event_id', usersController.addOneUserToOneEvent)
// supprime un utilisateur identifié par son ID de l’événement identifié par son ID.
router.delete('/:user_id/events/:event_id', usersController.deleteOneUserFromOneEvent)
//récupère la liste des sports préférés d'un utilisateur ciblé par son ID.
router.get('/:user_id/sports', usersController.getAllSportsFromOneUser)
//ajoute le sport identifié par son ID à l’utilisateur identifié par son ID.
router.post('/:user_id/sports/:sport_id', usersController.addOneSportToOneUser)
//supprime le sport identifié par son ID à l’utilisateur identifié par son ID.
router.delete('/:user_id/sports/:sport_id', usersController.deleteOneSportToOneUser)

*/

module.exports = router;
