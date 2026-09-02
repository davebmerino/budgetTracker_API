const Expense = require("../expense.schema.js");
const errorLogger = require("../../../helpers/errorLogger.js");
const { StatusCodes } = require("http-status-codes");

async function deleteExpenseProvider(req, res) {
  const { expenseId } = req.params;
  const userId = req.user.sub;

  try {
    const deletedExpense = await Expense.findOneAndDelete({
      _id: expenseId,
      userId,
    });

    if (!deletedExpense) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Expense not found",
      });
    }

    return res.status(StatusCodes.OK).json(deletedExpense);
  } catch (error) {
    errorLogger("Error while Deleting expense", req, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error while Deleting expense" });
  }
}

module.exports = deleteExpenseProvider;
