const sql = require('./db');

exports.getAllUsuarios = async () => {
  try {
    let query = "SELECT usuarios.id, usuarios.usuario, usuarios.estado, usuarios.createAt, usuarios.updateAt, usuarios.Rol_id, roles.nombre as 'Rol_nombre' FROM usuarios, roles WHERE usuarios.Rol_id = roles.id";
    let [result] = await sql.query(query);
    return result;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

exports.getOneUsuario = async (usuario, validar=true) => {
  try {
    let query = "SELECT usuarios.id, usuarios.usuario, usuarios.password, usuarios.Rol_id, roles.nombre as 'Rol_nombre' FROM usuarios, roles WHERE usuarios.Rol_id = roles.id AND usuario = ?";
    let [result] = await sql.query(query, usuario);
    if (!result && validar) {
      throw {
        status: 400,
        message: `No existe el usuario: '${usuario}'`,
      };
    }
    return result[0];
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

exports.getOneUsuarioId = async (usuarioId) => {
  try {
    let query = "SELECT usuarios.id, usuarios.usuario, usuarios.password, usuarios.Rol_id, roles.nombre as 'Rol_nombre' FROM usuarios, roles WHERE usuarios.Rol_id = roles.id AND usuarios.id = ?";
    let [result] = await sql.query(query, usuarioId);
    if (result.length === 0) {
      throw {
        status: 400,
        message: `No existe el usuario id: '${usuarioId}'`,
      };
    }
    return result;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

exports.createNewUsuario = async (nuevoUsuario) => {
  try {
    const usuarioExiste = await this.getOneUsuario(nuevoUsuario.usuario, false)
    
    if (usuarioExiste) {
      throw {
        status: 400,
        message: `El usuario con el nombre: '${nuevoUsuario.usuario}' ya esta registrado`
      };
    }

    let query = "INSERT INTO usuarios SET ?";
    let [result] = await sql.query(query, nuevoUsuario);

    return result;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

exports.updateOneUsuario = async (usuarioId, usuario) => {
  try {
    let query = "UPDATE usuarios set ?, updateAT= NOW() WHERE id = ?"
    let [result] = await sql.query(query, [usuario, usuarioId])
    return result;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

exports.deleteOneUsuario = async (usuarioId) => {
  try {
    const usuarioExiste = await this.getOneUsuarioId(usuarioId)
    
    let query = "DELETE FROM usuarios WHERE id = ?"
    let [result] = await sql.query(query, usuarioId)

    return result;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};