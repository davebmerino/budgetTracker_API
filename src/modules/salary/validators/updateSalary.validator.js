const { body } = require("express-validator");

const updateSalaryValidator = [
  body("_id").notEmpty().isMongoId().withMessage("Invalid salary ID").bail(),

  body("amount")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than zero")
    .bail()
    .toFloat(),

  body("payDate")
    .optional()
    .isISO8601({ strict: true })
    .withMessage("Pay date must be a valid ISO date")
    .bail()
    .toDate(),

  body("payPeriod")
    .optional()
    .isString()
    .withMessage("Pay period must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Pay period cannot be empty"),

  body("periodStart")
    .optional()
    .isISO8601({ strict: true })
    .withMessage("Period start must be a valid ISO date")
    .bail()
    .toDate(),

  body("periodEnd")
    .optional()
    .isISO8601({ strict: true })
    .withMessage("Period end must be a valid ISO date")
    .bail()
    .toDate(),

  body("notes")
    .optional()
    .isString()
    .withMessage("Notes must be a string")
    .bail()
    .trim(),
];

module.exports = updateSalaryValidator;
