const config = require('../config/env')
const jwt = require('jsonwebtoken');
const dbUsuario = require('../database/usuario');

const validarToken = async(req, res, next) => {
  const token = req.header(config.TOKEN_AUTH_NAME);
  if (!token) {
    return res
      .status(401)
      .send({
        status: "FAILED",
        data: { error: "Acceso denegado: No existe token en la solicitud" },
      });
  }
  try {
    const payload = jwt.verify(token, config.TOKEN_SECRET)
    const usuario = await dbUsuario.getOneUsuarioId(payload.id)
    req.locals = { usuario}
    next()
  } catch (error) {
    return res
      .status(401)
      .send({
        status: "FAILED",
        data: { error: "Acceso denegado: Token invalido - ", error },
      });
  }
}

module.exports = validarToken