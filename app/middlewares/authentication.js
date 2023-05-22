const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  // On extrait le token JWT de son cookie.
  const { token } = req.cookies;

  // Si un token a été on analyse sa validite en regardant s'il contient la bonne clé.
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        // Token invalide = HTTP 403 (Forbidden).
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
