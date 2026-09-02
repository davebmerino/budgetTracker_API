const mongoose = require("mongoose");
const { MONGO_URL, DB_NAME } = require("./env.js");

async function connectionDB() {
  const connectionSting = `${MONGO_URL}/${DB_NAME}`;
  try {
    await mongoose.connect(connectionSting);
  } catch (error) {
    console.log("Error on connecing with database:", error);
    process.exit(1);
  }
}

module.exports = connectionDB;
