const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const Expense = require("../expense.schema.js");
const errorLogger = require("../../../helpers/errorLogger.js");
const Salary = require("../../salary/salary.schema.js");

async function updateExpenseProvider(req, res) {
  const validatedData = matchedData(req);
  try {
    //Declare a params for expenseId and get the userId
    const { expenseId } = req.params;
    const userId = req.user.sub;

    //fetch for both  expenseId and userId so that I will only update the expense belongs to the user
    const expense = await Expense.findOne({
      _id: expenseId,
      userId,
    });

    //If no found expense
    if (!expense) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Expense not found",
      });
    }

    // If the expense date changes, find the new salary period
    if (validatedData.date) {
      const salary = await Salary.findOne({
        userId,
        periodStart: { $lte: validatedData.date },
        periodEnd: { $gte: validatedData.date },
      });
      if (!salary) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "No salary period covers the new expense date",
          data: null,
        });
      }

      expense.date = validatedData.date;
      expense.salaryId = salary._id;
    }
    if (validatedData.amount !== undefined) {
      expense.amount = validatedData.amount;
    }

    if (validatedData.title !== undefined) {
      expense.title = validatedData.title;
    }

    if (validatedData.description !== undefined) {
      expense.description = validatedData.description;
    }

    await expense.save();

    return res.status(StatusCodes.OK).json(expense);
  } catch (error) {
    errorLogger("Error on updating Expense", req, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error while creating expense" });
  }
}

module.exports = updateExpenseProvider;
