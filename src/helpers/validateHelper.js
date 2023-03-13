const { check, validationResult } = require('express-validator');

const validar = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: errors.array() },
      });
  }
  return next()
}

module.exports = validar;