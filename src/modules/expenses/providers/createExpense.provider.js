const { matchedData } = require("express-validator");

const Expense = require("../expense.schema.js");
const Salary = require("../../salary/salary.schema.js");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../../helpers/errorLogger.js");

async function createExpenseProvider(req, res) {
  const validatedData = matchedData(req);
  try {
    const userId = req.user.sub;
    const expenseDate = validatedData.date ?? new Date();

    const salary = await Salary.findOne({
      userId: req.user.sub,
      periodStart: { $lte: expenseDate },
      periodEnd: { $gte: expenseDate },
    });

    if (!salary) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Salary period not found",
      });
    }

    const expense = new Expense({
      ...validatedData,
      date: expenseDate,
      userId: userId,
      salaryId: salary._id,
    });
    await expense.save();
    return res.status(StatusCodes.CREATED).json(expense);
  } catch (error) {
    errorLogger("Error creating expense", req, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error while creating expense" });
  }
}

module.exports = createExpenseProvider;
