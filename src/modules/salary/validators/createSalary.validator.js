const { body } = require("express-validator");

const createSalaryValidator = [
  body("amount")
    .exists({ values: "falsy" })
    .withMessage("Salary amount is required")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("Salary amount must be greater than 0")
    .toFloat(),

  body("payDate")
    .notEmpty()
    .withMessage("Pay date is required")
    .bail()
    .isISO8601()
    .withMessage("Pay date must be a valid date")
    .toDate(),

  body("payPeriod")
    .notEmpty()
    .withMessage("Pay period is required")
    .bail()
    .isIn(["first-half", "second-half"])
    .withMessage("Pay period must be first-half or second-half"),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes must not exceed 500 characters"),

  body("userId")
    .not()
    .exists()
    .withMessage("userId cannot be provided manually"),

  body("periodStart")
    .not()
    .exists()
    .withMessage("periodStart is generated automatically"),

  body("periodEnd")
    .not()
    .exists()
    .withMessage("periodEnd is generated automatically"),
];

module.exports = createSalaryValidator;
