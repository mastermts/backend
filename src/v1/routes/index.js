const express = require("express");
const router = express.Router();

const authToken = require('../../middleware/authToken')
const validarToken = require('../../middleware/validarToken')
const validarRoles = require('../../middleware/validarRoles')

const usuarioRouter = require("./usuarioRoutes");
const loginRouter = require("./loginRoutes");
const rolRouter = require("./rolRoutes")

router.use("/login", loginRouter);
router.use("/usuarios", validarToken, validarRoles('Usuario', 'Administrador'), usuarioRouter);
router.use("/roles", validarToken, rolRouter)

module.exports = router;