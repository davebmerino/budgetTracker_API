const { query } = require("express-validator");

const getSalaryValidator = [
  query("page")
    .default(1)
    .isInt({ min: 1 })
    .withMessage("Page must be an integer greater than zero")
    .bail()
    .toInt(),

  query("limit")
    .default(10)
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be an integer between 1 and 100")
    .bail()
    .toInt(),

  query("order")
    .default("asc")
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc"),
];

module.exports = getSalaryValidator;