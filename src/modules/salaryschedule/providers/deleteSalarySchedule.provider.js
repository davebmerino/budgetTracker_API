const { StatusCodes } = require("http-status-codes");

const SalarySchedule = require("../salarySchedule.schema.js");
const errorLogger = require("../../../helpers/errorLogger.js");

async function deleteSalaryScheduleProvider(req, res) {
  try {
    // Only delete the authenticated user's salary schedule
    const filter = { userId: req.user.sub };

    const deletedSchedule = await SalarySchedule.findOneAndDelete(filter);

    // Handle if no schedule exists
    if (!deletedSchedule) {
      return res.status(StatusCodes.NOT_FOUND).json({
        reason: "Salary schedule not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Salary schedule successfully deleted.",
      data: deletedSchedule,
    });
  } catch (error) {
    errorLogger("Error while deleting salary schedule", req, error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      reason: "Something went wrong while deleting the salary schedule.",
    });
  }
}

module.exports = deleteSalaryScheduleProvider;
