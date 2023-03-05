const dbRol = require('../database/rol')

const rol = function (rol) {
  if(rol.id && rol.id != '') this.id = rol.id
  if(rol.nombre && rol.nombre != '') this.nombre = rol.nombre
  if(rol.estado && rol.estado != '') this.estado = rol.estado
};

rol.getAllRoles = async () => {
  try {
    const data = await dbRol.getAllRoles()
    return data;
  } catch (error) {
    throw error;
  }
}

rol.getOneRol = async(rol) => {
  try {
    const data = await dbRol.getOneRol(rol);
    return data;
  } catch (error) {
    throw error;
  }
};

rol.createNewRol = async(nuevoRol) => {
  try {
    const data = await dbRol.createNewRol(nuevoRol);
    return data;
  } catch (error) {
    throw error;
  }
};

rol.updateOneRol = async (rolId, rol) => {
  try {
    const data = await dbRol.updateOneRol(rolId, rol);
    return data;
  } catch (error) {
    throw error;
  }
};

rol.deleteOneRol = async (rolId) => {
  try {
    const data = await dbRol.deleteOneRol(rolId);
    return data;
  } catch (error) {
    throw error;
  }
};


module.exports = rol; 