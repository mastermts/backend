const validarRoles = (...roles) => {
  return (req, res, next) => {
    console.log(req.locals.usuario.Rol_nombre)
    if (roles.includes(req.locals.usuario.Rol_nombre)) {
      return next()
    }
    return res
      .status(401)
      .send({
        status: "FAILED",
        data: { error: "Acceso denegado: Rol no valido" },
      });
  }
}

module.exports = validarRoles