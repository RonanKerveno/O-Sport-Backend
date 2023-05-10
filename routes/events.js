const router = require('express').Router()
const eventsController = require('./controllers/eventsController');


//récupère la liste de tous les événements.
router.get('/', eventsController.getAllEvents)
// récupère l’événement ciblé par l’ID.
router.get('/:id', eventsController.getOneEvent)
//crée un nouvel événement.
router.post('/', eventsController.newEvent)
//met à jour les informations de l’événement ciblé par l’ID
router.patch(':id', eventsController.updateEvent)
//supprime un événement ciblé par l’ID.
router.delete(':id', eventsController.Event)


module.exports = router;