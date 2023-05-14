const sanitizer = require('sanitizer');

const bodySanitizer = (req, res, next) => {
  // Si on a un body, autrement dit, si on est sur autre chose qu'une requete get
  if (req.body) {
    // Pour chaque propriété dans le body (par exemple .name, .position, etc...)
    Object.keys(req.body).forEach((propName) => {
      if (Object.prototype.hasOwnProperty.call(req.body, propName)) {
        req.body[propName] = sanitizer.escape(req.body[propName]);
        // Par exemple pour le name, le traitement ressemble à ça :
        // req.body.name = sanitizer.escape(req.body.name);
      }
    });
  }
  next();
};

module.exports = bodySanitizer;
