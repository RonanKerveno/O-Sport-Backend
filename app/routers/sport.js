const router = require('express').Router();
const sportCtrl = require('../controllers/sport');

// récupère la liste de tous les sports.
router.get('/', sportCtrl.getAllSports);
// récupère un sport ciblé par l’ID.
router.get('/:id', sportCtrl.getOneSport);
// crée un nouveau sport.
router.post('/', sportCtrl.createOneSport);
// met à jour les informations du sport ciblé par ID.
router.patch('/:id', sportCtrl.updateOneSport);
// supprime un sport ciblé par l’ID.
router.delete('/:id', sportCtrl.deleteOneSport);

module.exports = router;
