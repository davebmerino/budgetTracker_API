const { body, param } = require("express-validator");
const EXPENSE_CATEGORIES = require("../constants/expenseCategory");

const updateExpenseValidator = [
  param("expenseId").isMongoId().withMessage("Invalid expense ID"),

  body("amount")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a number greater than 0")
    .toFloat(),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Title must not exceed 100 characters"),

  body("category")
    .optional()
    .trim()
    .isIn(EXPENSE_CATEGORIES)
    .withMessage(`Category must be one of: ${EXPENSE_CATEGORIES.join(", ")}`),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty")
    .bail()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be a valid ISO 8601 date")
    .toDate(),

  body("userId").not().exists().withMessage("userId cannot be changed"),
];

module.exports = updateExpenseValidator;
