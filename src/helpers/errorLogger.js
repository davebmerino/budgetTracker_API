const logger = require("./winston.js");

function errorLogger(message, req, error) {
  logger.error(`${message} : ${error.message}`, {
    metaData: {
      statusCode: error.code,
      errorName: error.name,
      method: req.method,
      url: req.originalUrl,
      body: req.body,
      query: req.query,
      params: req.params,
      error: error,
    },
  });
}

module.exports = errorLogger;
