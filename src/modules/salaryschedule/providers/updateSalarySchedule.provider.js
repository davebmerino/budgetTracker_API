const { matchedData } = require("express-validator");
const SalarySchedule = require("../salarySchedule.schema");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../../helpers/errorLogger");

async function updateSalaryScheduleProvider(req, res) {
  const validatedData = matchedData(req);

  try {
    //Get the salarySchedule 1st
    const salarySchedule = await SalarySchedule.findOne({
      userId: req.user.sub,
    });

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
