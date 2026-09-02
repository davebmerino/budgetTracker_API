const createUserProvider = require("./provider/createUser.provider.js");

async function handleCreateUser(req, res) {
  return await createUserProvider(req, res);
}

module.exports = {
  handleCreateUser,
};
