const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");

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
  createExpenseValidator,
  validateRequest,
  expenseController.handleCreateExpense,
);

expenseRouter.get(
  "/expense",
  createExpenseValidator,
  validateRequest,
  expenseController.handleGetExpense,
);

expenseRouter.patch(
  "/:expenseId",
  createExpenseValidator,
  validateRequest,
  expenseController.handleUpdateExpense,
);

expenseRouter.delete(
  "/:expenseId",
  createExpenseValidator,
  validateRequest,
  expenseController.handleDeleteExpense,
);

module.exports = expenseRouter;
