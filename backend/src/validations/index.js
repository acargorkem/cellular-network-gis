const { validationResult } = require('express-validator');

const validator = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  res.status(422);
  return res.json({
    error: result.errors[0].msg,
  });
};

module.exports = validator;
