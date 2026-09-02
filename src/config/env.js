require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  DB_NAME: process.env.DB_NAME,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ACCESS_EXPIRATION_TTL: process.env.JWT_ACCESS_EXPIRATION_TTL,
};
