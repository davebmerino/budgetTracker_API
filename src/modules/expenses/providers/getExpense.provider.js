const { matchedData } = require("express-validator");

const errorLogger = require("../../../helpers/errorLogger.js");
const Expense = require("../expense.schema.js");

async function getExpenseProvider(req, res) {
  const data = matchedData(req);
  try {
    //Pages
    const currentPage = data.page ?? 1;
    const limit = data.limit ?? 10;
    const order = data.order ?? "desc";
    const skip = (currentPage - 1) * limit;

    //URL
    const baseUrl =
      `${req.protocol}://${req.get("host")}` +
      `${req.originalUrl.split("?")[0]}`;

    // Only retrieve expenses owned by the logged-in user
    const filter = {
      userId: req.user.sub,
    };

    if (data.salaryId) {
      filter.salaryId = data.salaryId;
    }

    if (data.startDate || data.endDate) {
      filter.date = {};

      if (data.startDate) {
        filter.date.$gte = data.startDate;
      }

      if (data.endDate) {
        filter.date.$lte = data.endDate;
      }
    }

    const [expenses, totalExpenses, amountResult] = await Promise.all([
      Expense.find(filter)
        .sort({ date: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Expense.countDocuments(filter),

      Expense.aggregate([
        {
          $match: filter,
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
      ]),
    ]);

    const totalAmount = amountResult[0]?.totalAmount ?? 0;
    const totalPages = Math.max(1, Math.ceil(totalExpenses / limit));

    const previousPage = currentPage > 1 ? currentPage - 1 : null;

    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    const createPageLink = (page) => {
      if (page === null) return null;

      const params = new URLSearchParams({
        limit: String(limit),
        page: String(page),
        order,
      });

      if (data.salaryId) {
        params.set("salaryId", data.salaryId);
      }

      if (data.startDate) {
        params.set("startDate", data.startDate.toISOString());
      }

      if (data.endDate) {
        params.set("endDate", data.endDate.toISOString());
      }

      return `${baseUrl}?${params.toString()}`;
    };

    return res.status(StatusCodes.OK).json({
      message: "Expenses retrieved successfully",
      data: expenses,
      pagination: {
        meta: {
          itemsPerPage: limit,
          totalItems: totalExpenses,
          totalAmount,
          currentPage,
          totalPages,
        },

        links: {
          first: createPageLink(1),
          last: createPageLink(totalPages),
          current: createPageLink(currentPage),
          next: createPageLink(nextPage),
          previous: createPageLink(previousPage),
        },
      },
    });
  } catch (error) {
    errorLogger("Error getting expense", params.req, error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while fetching expenses",
      data: null,
    });
  }
}

module.exports = getExpenseProvider;
