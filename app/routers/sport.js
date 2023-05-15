const router = require('express').Router();
const sportCtrl = require('../controllers/sport');
const authenticateJWT = require('../middlewares/authentication');

// récupère la liste de tous les sports.
router.get('/', sportCtrl.getAllSports);
// récupère un sport ciblé par l’ID.
router.get('/:id', sportCtrl.getOneSport);
// crée un nouveau sport.
router.post('/', authenticateJWT, sportCtrl.createOneSport);
// met à jour les informations du sport ciblé par ID.
router.patch('/:id', authenticateJWT, sportCtrl.updateOneSport);
// supprime un sport ciblé par l’ID.
router.delete('/:id', authenticateJWT, sportCtrl.deleteOneSport);

module.exports = router;
