const express = require("express");

const authenticateToken = require("../../middleware/authenticateToken.js");
const validateRequest = require("../../middleware/validateRequest.middleware.js");
const expenseController = require("./expense.controller.js");

const createExpenseValidator = require("./validators/createExpense.validator.js");
const getExpensesValidator = require("./validators/getExpense.validator.js");
const updateExpenseValidator = require("./validators/updateExpense.validator.js");
const deleteExpenseValidator = require("./validators/deleteExpense.validator.js");

const expenseRouter = express.Router();
expenseRouter.use(authenticateToken);

expenseRouter.post(
  "/expense",
  (req, res, next) => {
    console.log("Expense route reached:", req.method, req.originalUrl);
    next();
  },
  createExpenseValidator,
  validateRequest,
  expenseController.handleCreateExpense,
);

expenseRouter.get(
  "/expense",
  getExpensesValidator,
  validateRequest,
  expenseController.handleGetExpense,
);

expenseRouter.patch(
  "/:expenseId",
  updateExpenseValidator,
  validateRequest,
  expenseController.handleUpdateExpense,
);

expenseRouter.delete(
  "/:expenseId",
  deleteExpenseValidator,
  validateRequest,
  expenseController.handleDeleteExpense,
);

module.exports = expenseRouter;
