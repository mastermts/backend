const dbUsuario = require('../database/usuario');

// constructor
const usuario = function (usuario) {
  if(usuario.id) this.id = usuario.id
  this.usuario = usuario.usuario
  if(usuario.password && usuario.password != '') this.password = usuario.password
  if(usuario.Rol_id && usuario.Rol_id != '') this.Rol_id = usuario.Rol_id
  if(usuario.estado && usuario.estado != '') this.estado = usuario.estado
}

usuario.getAllUsuarios = async() => {
  try {
    const data = await dbUsuario.getAllUsuarios();
    return data;
  } catch (error) {
    throw error;
  }
};

usuario.getOneUsuario = async(usuario) => {
  try {
    const data = await dbUsuario.getOneUsuario(usuario);
    return data;
  } catch (error) {
    throw error;
  }
};

usuario.createNewUsuario = async(nuevoUsuario) => {
  try {
    const data = await dbUsuario.createNewUsuario(nuevoUsuario);
    return data;
  } catch (error) {
    throw error;
  }
};

usuario.updateOneUsuario = async (usuarioId, usuario) => {
  try {
    const data = await dbUsuario.updateOneUsuario(usuarioId, usuario);
    return data;
  } catch (error) {
    throw error;
  }
};

usuario.deleteOneUsuario = async (usuarioId) => {
  try {
    const data = await dbUsuario.deleteOneUsuario(usuarioId);
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = usuario
