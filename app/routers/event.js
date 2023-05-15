const router = require('express').Router();
const eventCtrl = require('../controllers/event');
const authenticateJWT = require('../middlewares/authentication');

// récupère la liste de tous les événements
router.get('/', eventCtrl.getAllEvents);
// récupère l’événement ciblé par l’ID.
router.get('/:id', eventCtrl.getOneEvent);
// crée un nouvel événement.
router.post('/', authenticateJWT, eventCtrl.createOneEvent);
// met à jour les informations de l’événement ciblé par l’ID
router.patch('/:id', authenticateJWT, eventCtrl.updateEvent);
// supprime un événement ciblé par l’ID.
router.delete('/:id', authenticateJWT, eventCtrl.deleteEvent);

module.exports = router;
