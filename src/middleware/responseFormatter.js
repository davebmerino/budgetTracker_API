const { getReasonPhrase } = require("http-status-codes");

function responseFormatter(req, res, next) {
  const originalJson = res.json;

  res.json = (data) => {
    const response = {
      status:
        res.statusCode >= 200 && res.statusCode < 300 ? "sucess" : " error",
      statusCode: res.statusCode,
      message: getReasonPhrase(res.statusCode),
      data: data,
    };
    if (res.statusCode >= 200 && res.statusCode < 300) {
      response.data = data.pagination ? data.data : data;
    }

    if (res.statusCode >= 300) {
      response.data = data;
    }

    if (data.pagination) {
      response.pagination = data.pagination;
    }

    return originalJson.call(res, response);
  };

  next();
}

module.exports = responseFormatter;
