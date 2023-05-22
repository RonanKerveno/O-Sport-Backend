const jwt = require('jsonwebtoken');

const isLogged = (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        // On renvoie une réponse 200
        return res.status(200).json({ success: false, message: 'Aucun utilisateur connecté' });
      }

      req.user = user;
      next();
      return undefined;
    });
  } else {
    // On renvoie une réponse 200
    return res.status(200).json({ success: false, message: 'Aucun utilisateur connecté' });
  }

  return undefined;
};

module.exports = isLogged;
