const { body, param } = require("express-validator");

const createExpenseValidator = [
  body("amount")
    .exists({ values: "falsy" })
    .withMessage("Amount is required")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a number greater than 0")
    .toFloat(),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Title must not exceed 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .bail()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be a valid ISO 8601 date")
    .toDate(),

  body("userId")
    .not()
    .exists()
    .withMessage("userId cannot be provided manually"),

  body("salaryId").optional().isMongoId().withMessage("Invalid salary ID"),
];

module.exports = createExpenseValidator;
