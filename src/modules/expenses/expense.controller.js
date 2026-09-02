const createExpenseProvider = require("./providers/createExpense.provider.js");
const getExpenseProvider = require("./providers/getExpense.provider.js");

async function handleCreateExpense(req, res) {
  return await createExpenseProvider(req, res);
}

async function handleGetExpense(req, res) {
  return await getExpenseProvider(req, res);
}

module.exports = {
  handleCreateExpense,
  handleGetExpense,
};
