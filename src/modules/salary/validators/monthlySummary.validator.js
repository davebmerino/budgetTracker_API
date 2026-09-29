const { query } = require("express-validator");

const monthlySummaryValidator = [
  query("year")
    .notEmpty()
    .withMessage("Year is required")
    .bail()
    .isInt({ min: 2000, max: 2100 })
    .withMessage("Year must be valid")
    .toInt(),

  query("month")
    .notEmpty()
    .withMessage("Month is required")
    .bail()
    .isInt({ min: 1, max: 12 })
    .withMessage("Month must be between 1 and 12")
    .toInt(),
];

module.exports = monthlySummaryValidator;
