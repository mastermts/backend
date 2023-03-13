const express = require("express");
const usuarioController = require("../../controllers/usuarioController");

const validarUSuario = require('../../validators/usuario')

const router = express.Router();

router.get("/", usuarioController.getAllUsuarios);
router.get("/:usuario", validarUSuario.validarGetOneUsuario, usuarioController.getOneUsuario);
router.post("/",validarUSuario.validarCreateNewUsuario, usuarioController.createNewUsuario);
router.patch("/:usuarioId", usuarioController.updateOneUsuario);
router.delete("/:usuarioId", usuarioController.deleteOneUsuario);

module.exports = router;