const { param } = require("express-validator");

const deleteExpenseValidator = [
  param("expenseId").isMongoId().withMessage("Invalid expense ID"),
];

module.exports = deleteExpenseValidator;
