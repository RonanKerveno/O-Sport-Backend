const router = require('express').Router();
const sportsController = require('./controllers/sportsController');

//récupère la liste de tous les sports.
router.get('/', sportsController.getAllSports)
//récupère un sport ciblé par l’ID.
router.get('/:id', sportsController.getOneSport)
//crée un nouveau sport.
router.post('/', sportsController.createOneSport)
//met à jour les informations du sport ciblé par ID.
router.patch('/:id', sportsController.updateOneSport)
//supprime un sport ciblé par l’ID.
router.delete('/:id', sportsController.deleteOneSport)

module.exports = router;