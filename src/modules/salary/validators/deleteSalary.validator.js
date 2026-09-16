const { body } = require("express-validator");

const deleteSalaryValidator = [
  body("_id").isMongoId().withMessage("Invalid salary ID"),
];

module.exports = deleteSalaryValidator;
