const createExpenseProvider = require("./providers/createExpense.provider.js");
const deleteExpenseProvider = require("./providers/deleteExpense.provider.js");
const getExpenseProvider = require("./providers/getExpense.provider.js");
const updateExpenseProvider = require("./providers/updateExpense.provider.js");

async function handleCreateExpense(req, res) {
  return await createExpenseProvider(req, res);
}

async function handleGetExpense(req, res) {
  return await getExpenseProvider(req, res);
}

async function handleUpdateExpense(req, res) {
  return await updateExpenseProvider(req, res);
}

async function handleDeleteExpense(req, res) {
  return await deleteExpenseProvider(req, res);
}

module.exports = {
  handleCreateExpense,
  handleGetExpense,
  handleUpdateExpense,
  handleDeleteExpense,
};
