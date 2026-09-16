const { matchedData } = require("express-validator");
const errorLogger = require("../../../helpers/errorLogger.js");
const { StatusCodes } = require("http-status-codes");
const Salary = require("../salary.schema.js");

async function deleteSalaryProvider(req, res) {
  const validatedData = matchedData(req);
  try {
    const deleteSalary = await Salary.deleteOne({
      _id: validatedData["_id"],
      user: req.user.sub,
    });

    if (deleteSalary.deletedCount === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ reason: "Task not found." });
    }
  } catch (error) {
    errorLogger("Please check double check fialeds", req, error);

    return res.status(StatusCodes.BAD_GATEWAY).json({
      message: "Please trying again",
    });
  }
}

module.exports = deleteSalaryProvider;
