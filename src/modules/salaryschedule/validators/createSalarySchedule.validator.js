const { body } = require("express-validator");

const createSalaryScheduleValidator = [
  body("firstPayDay")
    .exists()
    .withMessage("First payday is required")
    .bail()
    .isInt({ min: 1, max: 27 })
    .withMessage("First payday must be a whole number between 1 and 27")
    .bail()
    .toInt(),

  body("secondPayDay")
    .exists()
    .withMessage("Second payday is required")
    .bail()
    .isInt({ min: 2, max: 31 })
    .withMessage("Second payday must be a whole number between 2 and 31")
    .bail()
    .toInt()
    .custom((value, { req }) => {
      const firstPayDay = Number(req.body.firstPayDay);

      // Let the firstPayDay validator report invalid first values.
      if (
        Number.isInteger(firstPayDay) &&
        firstPayDay >= 1 &&
        firstPayDay <= 27 &&
        value <= firstPayDay
      ) {
        throw new Error("Second payday must be after the first payday");
      }

      return true;
    }),
];

module.exports = createSalaryScheduleValidator;
