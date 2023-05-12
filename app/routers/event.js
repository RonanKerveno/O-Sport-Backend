const router = require('express').Router();
const eventCtrl = require('../controllers/event');

// récupère la liste de tous les événements
router.get('/', eventCtrl.getAllEvents);
// récupère l’événement ciblé par l’ID.
router.get('/:id', eventCtrl.getOneEvent);
// crée un nouvel événement.
router.post('/', eventCtrl.newEvent);
// met à jour les informations de l’événement ciblé par l’ID
router.patch(':id', eventCtrl.updateEvent);
// supprime un événement ciblé par l’ID.
router.delete(':id', eventCtrl.deleteEvent);

module.exports = router;
