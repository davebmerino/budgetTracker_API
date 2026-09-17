const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const errorLogger = require("../../../helpers/errorLogger");
const SalarySchedule = require("../salarySchedule.schema");

async function createSalaryScheduleProvider(req, res) {
  const validatedData = matchedData(req);
  try {
    const salarySchedule = new SalarySchedule({
      ...validatedData,
      userId: req.user.sub,
    });
    await salarySchedule.save();
    return res.status(StatusCodes.CREATED).json(salarySchedule);
  } catch (error) {
    errorLogger(
      `Error while creating salary schedule: ${error.message}`,
      req,
      error,
    );
    return res.status(StatusCodes.BAD_GATEWAY).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = createSalaryScheduleProvider;
