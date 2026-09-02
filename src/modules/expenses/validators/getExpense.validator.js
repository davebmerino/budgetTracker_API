const { query } = require("express-validator");

const getExpensesValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be at least 1")
    .toInt(),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100")
    .toInt(),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be either asc or desc"),

  query("salaryId").optional().isMongoId().withMessage("Invalid salary ID"),

  query("startDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid start date")
    .toDate(),

  query("endDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid end date")
    .toDate(),
];

module.exports = getExpensesValidator;
