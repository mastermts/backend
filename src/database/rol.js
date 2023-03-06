const sql = require('./db');

exports.getAllRoles = async () => {
  try {
    let query = "SELECT * FROM roles";
    let [result] = await sql.query(query);
    return result;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

exports.getOneRol = async (rol, validar=true) => {
  try {
    let query = "SELECT * FROM roles WHERE nombre = ?";
    let [result] = await sql.query(query, rol);

    if (!result) {
      if(validar){
        throw {
          status: 400,
          message: `No existe el rol: '${rol}'`,
        };
      }
      return false;
    }
    return result[0];
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

exports.getOneRolId = async (RolId) => {
  try {
    let query = "SELECT * FROM roles WHERE id = ?";
    let [result] = await sql.query(query, RolId);
    if (result.length === 0) {
      throw {
        status: 400,
        message: `No existe el usuario id: '${RolId}'`,
      };
    }
    return result;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

exports.createNewRol = async (nuevoRol) => {
  try {
    const rolExiste = await this.getOneRol(nuevoRol.nombre, false)

    if (rolExiste) {
      throw {
        status: 400,
        message: `El rol con el nombre: '${nuevoRol.nombre}' ya esta registrado`
      };
    }

    let query = "INSERT INTO roles SET ?";
    let [result] = await sql.query(query, nuevoRol);

    return result;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

exports.updateOneRol = async (rolId, rol) => {
  try {
    let query = "UPDATE roles set ?, updateAT= NOW() WHERE id = ?"
    let [result] = await sql.query(query, [rol, rolId])
    return result;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

exports.deleteOneRol= async (rolId) => {
  try {
    const rolExiste = await this.getOneRolId(rolId)
    
    let query = "DELETE FROM roles WHERE id = ?"
    let [result] = await sql.query(query, rolId)

    return result;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};