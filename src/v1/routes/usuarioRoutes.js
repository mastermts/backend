const express = require("express");
const usuarioController = require("../../controllers/usuarioController");

const router = express.Router();

router.get("/", usuarioController.getAllUsuarios);
router.get("/:usuario", usuarioController.getOneUsuario);
router.post("/", usuarioController.createNewUsuario);
router.patch("/:usuarioId", usuarioController.updateOneUsuario);
router.delete("/:usuarioId", usuarioController.deleteOneUsuario);

module.exports = router;