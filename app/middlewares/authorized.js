const authenticateJWT = require('./authentication');

const authorized = (req, res, next) => {
  authenticateJWT(req, res, () => {
    const userId = req.params.id;

    // Vérifier que l'utilisateur est le propriétaire du profil ou un administrateur
    if (!(req.user && (Number(req.user.userId) === Number(userId) || req.user.isAdmin))) {
      return res.status(403).json({ error: 'Vous n\'avez pas les droits nécessaires pour modifier ce profil.' });
    }

    // L'utilisateur est autorisé, on passe à la suite
    next();
    return undefined;
  });
};

module.exports = authorized;
