const router = require('express').Router();
const eventCtrl = require('../controllers/event');
const { authenticationJWT } = require('../middlewares');

// récupère la liste de tous les événements à venir
router.get('/', eventCtrl.getAllEventsToCome);
// récupère la liste de tous les événements même passés
router.get('/all', eventCtrl.getAllEvents);
// récupère l’événement ciblé par l’ID.
router.get('/:id', eventCtrl.getOneEvent);
// crée un nouvel événement.
router.post('/', authenticationJWT, eventCtrl.createOneEvent);
// met à jour les informations de l’événement ciblé par l’ID
router.patch('/:id/', authenticationJWT, eventCtrl.updateEvent);
// supprime un événement ciblé par l’ID.
router.delete('/:id/', authenticationJWT, eventCtrl.deleteEvent);

module.exports = router;
