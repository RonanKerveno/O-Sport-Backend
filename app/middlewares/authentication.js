const jwt = require('jsonwebtoken');

// Recherche du token JWT dans l'en-tête Authorization de la requête.
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    // On regarde si le Token utilise la bonne clé secrète.
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        // Clé secrète non vérifiée = HTTP 403 (Forbidden).
        return res.sendStatus(403);
      }

      // Token validé, on passe les infos utilisateur dans req.
      req.user = user;
      next();
      return undefined;
    });
  } else {
    // Token absent = HTTP 401 (Unauthorized).
    return res.sendStatus(401);
  }

  return undefined;
};

module.exports = authenticateJWT;

// Ce middleware peut être utilisé pour sécuriser une route de cette manière :

// const authenticateJWT = require('./path/to/middleware');

// router.patch('/:id', authenticateJWT, userCtrl.updateOneUser);
