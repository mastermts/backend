const rolService = require("../services/rolService")
const { v4: uuidv4 } = require('uuid')
const config = require('../config/env')

exports.getAllRoles = async (req, res) => {
  try {
    const data = await rolService.getAllRoles();
    res.status(201).send({ status: "OK", data: data });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

exports.getOneRol = async (req, res) => {
  const {
    params: { rol },
  } = req;
  if (!rol) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parametro ':rol' no puede estar vacio" },
      });
  }
  try {
    const data = await rolService.getOneRol(rol);

    if (data) {
      res.send({ status: "OK", data: data });
    } else {
      res
        .status(400)
        .send({
          status: "FAILED",
          data: { error: `El rol:${rol} no existe` },
        });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

exports.createNewRol = async (req, res) => {
  const { body } = req;
  if (!body.nombre) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: {
          error:
            "Falta una de las siguientes claves: 'nombre'",
        },
      });
  }

  // Crear un Rol
  const newRol = new rolService({
    id: uuidv4(),
    nombre: body.nombre,
    estado: body.estado || 1,
  });

  try {
    const data = await rolService.createNewRol(newRol);
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
    params: { rolId },
  } = req;

  if (!rolId || !body) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "parametro ':rolId, nombre' no pueden estar vacio" },
      });
  }

  // Set usuario
  const rol = new rolService({
    nombre: body.nombre,
    estado: body.estado || ''
  });

  try {
    const data = await rolService.updateOneRol(rolId, rol);
    res.send({ status: "OK", data: data });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

exports.deleteOneRol = async (req, res) => {
  const {
    params: { rolId },
  } = req;
  if (!rolId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parametro ':rolId' no puede estar vacio" },
      });
  }
  try {
    const data = await rolService.deleteOneRol(rolId);
    res.send({ status: "OK", data: data });

  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};