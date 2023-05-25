const sanitizer = require('sanitizer');

const bodySanitizer = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach((propName) => {
      if (typeof req.body[propName] === 'string') {
        req.body[propName] = sanitizer.escape(req.body[propName]);
      }
    });
  }
  next();
};

module.exports = bodySanitizer;
