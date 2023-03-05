const express = require("express");
const router = express.Router();

const authToken = require('../../middleware/authToken')

const usuarioRouter = require("./usuarioRoutes");
const loginRouter = require("./loginRoutes");
const rolRouter = require("./rolRoutes")

router.use("/login", loginRouter);
router.use("/usuarios", authToken.validarToken, usuarioRouter);
router.use("/roles", authToken.validarToken, rolRouter)

module.exports = router;