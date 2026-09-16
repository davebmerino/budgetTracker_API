const createSalaryProvider = require("./providers/createSalary.provider.js");
const deleteSalaryProvider = require("./providers/deleteSalary.provider.js");
const getSalaryProvider = require("./providers/getSalary.provider.js");
const updateSalaryProvider = require("./providers/updateSalary.provider.js");

async function handleCreateSalary(req, res) {
  return await createSalaryProvider(req, res);
}

async function handleUpdateSalary(req, res) {
  return await updateSalaryProvider(req, res);
}

async function handleDeleteSalary(req, res) {
  return await deleteSalaryProvider(req, res);
}

async function handleGetSalary(req, res) {
  return await getSalaryProvider(req, res);
}
module.exports = {
  handleCreateSalary,
  handleDeleteSalary,
  handleGetSalary,
  handleUpdateSalary,
};
