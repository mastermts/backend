require('dotenv').config({ override: true });

module.exports = {
  PORT: parseInt(process.env.PORT),
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  SALT: parseInt(process.env.SALT),
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  TOKEN_AUTH_NAME: process.env.TOKEN_AUTH_NAME
}