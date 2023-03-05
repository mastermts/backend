const usuarioService = require("../services/usuarioService");
const config = require('../config/env')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const moment = require('moment');

exports.createToken = (usuario) => {
  let token = jwt.sign({
    id: usuario.id,
    usuario: usuario.usuario,
    rol: usuario.Rol_nombre,

    tiempoInicio: moment().unix(),
    tiempoExpiracion: moment().add(1, 'days').unix()
  }, process.env.TOKEN_SECRET)
  return token;
};

exports.getLogin = async (req, res) => {
  
  const {
    body: { usuario, password },
  } = req;
  if (!usuario || !password) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parametros 'usuario', 'password' no puede estar vacio" },
      });
  }
 
  try {
    let dbUsuario = await usuarioService.getOneUsuario(usuario)
    let validarPass = bcrypt.compareSync(password + config.TOKEN_SECRET, dbUsuario.password);
    if (validarPass) {
      res.send({
        status: "OK",
        data: {
          login: true,
          usuario: {
            id: dbUsuario.id,
            usuario: dbUsuario.usuario,
            rol: dbUsuario.Rol_nombre,
          },
          token: this.createToken(usuario)
        }
      });

    } else {
      res
        .status(400)
        .send({
          status: "FAILED",
          data: { error: `Usuario o Contraseña incorrecta` },
        });
    }

  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};