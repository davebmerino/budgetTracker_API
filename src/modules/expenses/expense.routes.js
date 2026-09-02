const express = require("express");
const { validationResult } = require("express-validator");

const createExpenseValidator = require("./validators/createExpense.validator.js");
const authenticateToken = require("../../middleware/authenticateToken.js");
const expenseController = require("./expense.controller.js");
const { StatusCodes } = require("http-status-codes");
const getExpensesValidator = require("./validators/getExpense.validator.js");
const updateExpenseValidator = require("./validators/updateExpense.validator.js");
const deleteExpenseValidator = require("./validators/deleteExpense.validator.js");

const expenseRouter = express.Router();

expenseRouter.post(
  "/expense",
  [createExpenseValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      return expenseController.handleCreateExpense(req, res);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  },
);

expenseRouter.get(
  "/expense",
  [getExpensesValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      return expenseController.handleGetExpense(req, res);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  },
);

expenseRouter.patch(
  "/:expenseId",
  [updateExpenseValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      return expenseController.handleUpdateExpense(req, res);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  },
);

expenseRouter.delete(
  "/:expenseId",
  [deleteExpenseValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return expenseController.handleDeleteExpense(req, res);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  },
);

module.exports = expenseRouter;
