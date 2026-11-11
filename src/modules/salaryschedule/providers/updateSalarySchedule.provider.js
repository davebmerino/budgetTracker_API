const { matchedData } = require("express-validator");
const SalarySchedule = require("../salarySchedule.schema");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../../helpers/errorLogger");

async function updateSalaryScheduleProvider(req, res) {
  const validatedData = matchedData(req);
  const userId = req.user.sub;

  try {
    console.log("Authenticated user ID:", userId);
    //Get the salarySchedule 1st
    const salarySchedule = await SalarySchedule.findOne({
      userId
    });

    console.log("Found salary schedule:", salarySchedule);

    //
    if (!salarySchedule) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Salary schedule not found",
      });
    }

    salarySchedule.firstPayDay =
      validatedData.firstPayDay || salarySchedule.firstPayDay;
    salarySchedule.secondPayDay =
      validatedData.secondPayDay || salarySchedule.secondPayDay;

    const firstPayDay = validatedData.firstPayDay ?? salarySchedule.firstPayDay;

    const secondPayDay =
      validatedData.secondPayDay ?? salarySchedule.secondPayDay;

    if (secondPayDay <= firstPayDay) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Second payday must be after the first payday",
      });
    }

    await salarySchedule.save();

    return res.status(StatusCodes.OK).json({
      status: "success",
      statusCode: StatusCodes.OK,
      message: "Salary schedule updated successfully",
      data: salarySchedule,
    });
  } catch (error) {
    errorLogger(
      `Error while updating salary schedule: ${error.message}`,
      req,
      error,
    );
    return res.status(StatusCodes.BAD_GATEWAY).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = updateSalaryScheduleProvider;
