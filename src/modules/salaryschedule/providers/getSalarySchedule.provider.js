const { matchedData } = require("express-validator");
const SalarySchedule = require("../salarySchedule.schema");
const errorLogger = require("../../../helpers/errorLogger");
const { StatusCodes } = require("http-status-codes");

async function getSalaryScheduleProvider(req, res) {
  const validatedData = matchedData(req);
  try {
    // Filter by authenticated user
    const filter = { userId: req.user.sub };

    const salarySchedule = await SalarySchedule.findOne(filter);

    if (!salarySchedule) {
      return res.status(StatusCodes.OK).json({
        data: null,
        message: "No salary schedule found. Please create one first.",
      });
    }

    return res.status(StatusCodes.OK).json({
      data: salarySchedule,
    });
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

module.exports = getSalaryScheduleProvider;
