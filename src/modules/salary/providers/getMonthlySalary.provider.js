const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const Salary = require("../salary.schema.js");
const Expense = require("../../expenses/expense.schema.js");
const errorLogger = require("../../../helpers/errorLogger.js");

async function getMonthlySalarySummaryProvider(req, res) {
  const data = matchedData(req);

  try {
    const userId = req.user.sub;

    const year = Number(data.year);
    const month = Number(data.month);

    // JS months are zero-based.
    // month = 9 means September, so subtract 1.
    const startDate = new Date(Date.UTC(year, month - 1, 1));

    const endDate = new Date(Date.UTC(year, month, 1));

    // Find ALL salaries received during the selected month.
    // This works whether there are 1, 2, or even more salaries.
    const salaries = await Salary.find({
      userId,
      payDate: {
        $gte: startDate,
        $lt: endDate,
      },
    }).sort({
      payDate: 1,
    });

    // Total salary for the month
    const totalSalary = salaries.reduce(
      (total, salary) => total + salary.amount,
      0,
    );

    const salaryIds = salaries.map((salary) => salary._id);

    // Get expenses belonging to those salaries
    const categoryTotals =
      salaryIds.length > 0
        ? await Expense.aggregate([
            {
              $match: {
                salaryId: {
                  $in: salaryIds,
                },
              },
            },
            {
              $group: {
                _id: "$category",
                total: {
                  $sum: "$amount",
                },
              },
            },
            {
              $sort: {
                total: -1,
              },
            },
          ])
        : [];

    // Format categories
    const categories = categoryTotals.map((item) => ({
      category: item._id,

      total: item.total,

      percentage:
        totalSalary > 0
          ? Number(((item.total / totalSalary) * 100).toFixed(2))
          : 0,
    }));

    // Calculate total expenses
    const totalExpenses = categories.reduce(
      (total, category) => total + category.total,
      0,
    );

    // Remaining salary
    const remainingBalance = totalSalary - totalExpenses;

    // Overall percentage spent
    const spentPercentage =
      totalSalary > 0
        ? Number(((totalExpenses / totalSalary) * 100).toFixed(2))
        : 0;

    return res.status(StatusCodes.OK).json({
      data: {
        year,
        month,

        salaryCount: salaries.length,

        totalSalary,

        totalExpenses,

        remainingBalance,

        spentPercentage,

        salaries,

        categories,
      },
    });
  } catch (error) {
    errorLogger("Error while fetching monthly salary summary", req, error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error while fetching monthly salary summary",
    });
  }
}

module.exports = getMonthlySalarySummaryProvider;
