const config = require('../config/env')
const mysql = require("mysql2/promise");

// Crear una conexión a la base de datos.
const poll = mysql.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB,
  dateStrings: true
});


module.exports = poll;