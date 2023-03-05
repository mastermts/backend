const usuarioService = require("../services/usuarioService");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const config = require('../config/env')

exports.getAllUsuarios = async (req, res) => {
  try {
    const data = await usuarioService.getAllUsuarios();
    res.status(201).send({ status: "OK", data: data });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

exports.getOneUsuario = async (req, res) => {
  const {
    params: { usuario },
  } = req;
  if (!usuario) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parametro ':usuario' no puede estar vacio" },
      });
  }
  try {
    const data = await usuarioService.getOneUsuario(usuario);

    if (data) {
      res.send({ status: "OK", data: data });
    } else {
      res
        .status(400)
        .send({
          status: "FAILED",
          data: { error: `El usuario:${usuario} no existe` },
        });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

exports.createNewUsuario = async (req, res) => {
  const { body } = req;
  if (
    !body.usuario ||
    !body.password ||
    !body.Rol_id
  ) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: {
          error:
            "Falta una de las siguientes claves: 'usuario', 'password' , 'Rol_id'",
        },
      });
    return;
  }

  // Crear un Usuario
  const newUsuario = new usuarioService({
    id: uuidv4(),
    usuario: body.usuario,
    password: bcrypt.hashSync(body.password + config.TOKEN_SECRET, config.SALT),
    Rol_id: body.Rol_id,
  });

  try {

    const data = await usuarioService.createNewUsuario(newUsuario);
    res.status(201).send({ status: "OK", data: data });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

exports.updateOneUsuario = async (req, res) => {
  const {
    body,
    params: { usuarioId },
  } = req;

  if (!usuarioId || !body) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "parametro ':usuarioId, usuario' no pueden estar vacio" },
      });
  }

  // Set usuario
  const usuario = new usuarioService({
    usuario: body.usuario,
    password: (body.password) ? bcrypt.hashSync(body.password + config.TOKEN_SECRET, config.SALT) : '',
    Rol_id: body.Rol_id || '',
  });

  try {
    const data = await usuarioService.updateOneUsuario(usuarioId, usuario);
    res.send({ status: "OK", data: data });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

exports.deleteOneUsuario = async (req, res) => {
  const {
    params: { usuarioId },
  } = req;
  if (!usuarioId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parametro ':usuarioId' no puede estar vacio" },
      });
  }
  try {
    const data = await usuarioService.deleteOneUsuario(usuarioId);
    res.send({ status: "OK", data: data });

  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};