const { matchedData } = require("express-validator");
const Salary = require("../salary.schema.js");

async function getSalaryProvider(req, res) {
  const data = matchedData(req);
  try {
    //URL
    const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl.split("?")[0]}`;

    const currentPage = parseInt(data.page);
    const limit = parseInt(data.limit);
    const order = data.order;

    //Filter by user
    const filter = { user: req.user.sub };

    const totalTask = await Task.countDocuments(filter);
    const totalPages = Math.max(Math.ceil(totalTask / limit), 1);
    const nextPage = currentPage >= totalPages ? currentPage : currentPage + 1;
    const previousPage = currentPage <= 1 ? currentPage : currentPage - 1;

    //I use filter to only find salary belongs to the user
    const salary = await Salary.find(filter)
      .limit(limit)
      .skip((currentPage - 1) * limit)
      .sort({ payDate: order === "asc" ? 1 : -1 });

    return res.status(StatusCodes.OK).json({
      data: salary,
      pagination: {
        meta: {
          itemsPerPage: limit,
          totalItem: totalTask,
          currentPage,
          totalPage: totalPages,
        },
        links: {
          first: `${baseUrl}?limit=${limit}&page=1&order=${order}`,
          last: `${baseUrl}?limit=${limit}&page=${totalPages}&order=${order}`,
          currentPage: `${baseUrl}?limit=${limit}&page=${currentPage}&order=${order}`,
          nextPage: `${baseUrl}?limit=${limit}&page=${nextPage}&order=${order}`,
          previousPage: `${baseUrl}?limit=${limit}&page=${previousPage}&order=${order}`,
        },
      },
    });
  } catch (error) {
    errorLogger("Error while fetching", req, error);
    return res.status(StatusCodes.BAD_GATEWAY).json({
      reason: "Gateway timeout, please try again later",
    });
  }
}
