const Salary = require("../salary.schema.js");
const calculateSalaryPeriod = require("../helpers/calculateSalaryPeriod.helper.js");

const { StatusCodes } = require("http-status-codes");
const { matchedData } = require("express-validator");
const errorLogger = require("../../../helpers/errorLogger.js");

async function createSalaryProvider(req, res) {
  try {
    const data = matchedData(req);
    const userId = req.user.sub;

    const { periodStart, periodEnd } = calculateSalaryPeriod(
      data.payDate,
      data.payPeriod,
    );

    const existingSalary = await Salary.findOne({
      userId,
      payDate: data.payDate,
    });

    if (existingSalary) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "A salary record already exists for this pay date",
        data: null,
      });
    }

    // Prevent overlapping salary periods
    const overlappingSalary = await Salary.findOne({
      userId,
      periodStart: { $lte: periodEnd },
      periodEnd: { $gte: periodStart },
    });

    if (overlappingSalary) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "This salary period overlaps an existing salary period",
        data: null,
      });
    }

    const salary = await Salary.create({
      userId,
      amount: data.amount,
      payDate: data.payDate,
      payPeriod: data.payPeriod,
      periodStart,
      periodEnd,
      notes: data.notes ?? "",
    });

    return res.status(StatusCodes.CREATED).json(salary);
  } catch (error) {
    if (
      error.message.includes("pay date") ||
      error.message.includes("pay period")
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message,
        data: null,
      });
    }

    // MongoDB duplicate-key error
    if (error.code === 11000) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "A salary record already exists for this pay date",
        data: null,
      });
    }

    errorLogger("Error while creating salary", req, error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while creating the salary",
      data: null,
    });
  }
}

module.exports = createSalaryProvider;
