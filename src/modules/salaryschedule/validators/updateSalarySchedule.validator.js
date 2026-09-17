const { body } = require("express-validator");

const updateSalaryScheduleValidator = [
  // Check that there is something to update.
  // Do not sanitize the entire body: only validate named fields below.
  body().custom((value) => {
    if (value?.firstPayDay === undefined && value?.secondPayDay === undefined) {
      throw new Error("Provide at least one payday field to update");
    }

    return true;
  }),

  body("firstPayDay")
    .optional()
    .isInt({ min: 1, max: 27 })
    .withMessage("First payday must be a whole number between 1 and 27")
    .bail()
    .toInt(),

  body("secondPayDay")
    .optional()
    .isInt({ min: 2, max: 31 })
    .withMessage("Second payday must be a whole number between 2 and 31")
    .bail()
    .toInt()
    .custom((value, { req }) => {
      if (req.body.firstPayDay === undefined) {
        return true;
      }

      const firstPayDay = Number(req.body.firstPayDay);

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

module.exports = updateSalaryScheduleValidator;
