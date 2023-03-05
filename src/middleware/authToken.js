const config = require('../config/env')
const jwt = require('jsonwebtoken');
const moment = require('moment');

exports.validarToken = (req, res, next) => {
    try {
        const token = req.header(config.TOKEN_AUTH_NAME);
        //validar si llego el token
        if (!token)
            return res
                .status(401)
                .send({
                    status: "FAILED",
                    data: { error: "Acceso denegado" },
                });

        const tokenDecode = jwt.decode(token, config.TOKEN_SECRET);
        //validar token
        if (!tokenDecode)
            return res
                .status(401)
                .send({
                    status: "FAILED",
                    data: { error: "Acceso denegado" },
                });

        // comprobar si el token expirado
        if (tokenDecode.tiempoExpiracion <= moment().unix()) {
            return res
                .status(401)
                .send({
                    status: "FAILED",
                    data: { error: "Acceso denegado, Token Expirado" },
                });
        }

        next() // continuamos

    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }

}