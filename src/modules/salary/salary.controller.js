const createSalaryProvider = require("./providers/createSalary.provider.js");

async function handleCreateSalary(req, res) {
  return await createSalaryProvider(req, res);
}

module.exports = {
  handleCreateSalary,
};
