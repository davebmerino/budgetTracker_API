const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "You are not authorized to access this resource.",
    });
  }

  //Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: "Invalid request.",
      });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
