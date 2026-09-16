const { matchedData } = require("express-validator");
const errorLogger = require("../../../helpers/errorLogger.js");
const { StatusCodes } = require("http-status-codes");
const Salary = require("../salary.schema.js");

async function updateSalaryProvider(req, res) {
  const validatedData = matchedData(req);

  try {
    const salary = await Salary.findById({
      _id: validatedData._id,
      user: req.user.sub,
    });

    if (!salary) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ reason: "Salary not found." });
    }

    salary.amount = validatedData.amount || salary.amount;
    salary.payDate = validatedData.payDate || salary.payDate;
    salary.payPeriod = validatedData.payPeriod || salary.payPeriod;
    salary.periodStart = validatedData.periodStart || salary.periodStart;
    salary.periodEnd = validatedData.periodEnd || salary.periodEnd;
    salary.notes = validatedData.notes || salary.notes;
  } catch (error) {
    errorLogger("Something wrong while updating", req, error);
    return res.status(StatusCodes).json({
      message: "Please check the feilds",
    });
  }
}

module.exports = updateSalaryProvider;
