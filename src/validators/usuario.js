const { check } = require('express-validator');
const validar = require('../helpers/validateHelper')

const validarGetOneUsuario = [
  check('usuario')
    .exists()
    .withMessage('no puede estar vacío'),
  (req, res, next) => {
    validar(req, res, next)
  }
]

const validarCreateNewUsuario = [
  check('usuario')
    .exists()
    .withMessage('no puede estar vacío'),
  check('password')
    .exists()
    .withMessage('no puede estar vacío'),
  check('Rol_id')
    .exists()
    .withMessage('no puede estar vacío'),
    (req, res, next) => {
      validar(req, res, next)
    }
]

const validarUpdateOneUsuario = [
  check('usuarioId')
    .exists()
    .withMessage('no puede estar vacío'),
  check('password')
    .exists()
    .withMessage('no puede estar vacío'),
  check('Rol_id')
    .exists()
    .withMessage('no puede estar vacío'),
    (req, res, next) => {
      validar(req, res, next)
    }
]

module.exports = { 
  validarGetOneUsuario,
  validarCreateNewUsuario,
  validarUpdateOneUsuario
}