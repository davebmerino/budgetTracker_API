const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const morgan = require("morgan");

const responseFormatter = require("./middleware/responseFormatter.js");
const userRoutes = require("./modules/user/user.routes.js");
const expressWinstonMiddleware = require("./middleware/expressWinston.js");
const loginRouter = require("./auth/auth.routes.js");

const app = express();

app.use(express.json());

app.use(cors());

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "..", "access.log"),
  { flags: "a" },
);

//middleware
app.use(morgan("combined", { stream: accessLogStream }));
app.use(responseFormatter);
app.use(expressWinstonMiddleware);

//Routes
app.use("/api", userRoutes);
app.use("/api", loginRouter);

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    status: StatusCodes.NOT_FOUND,
    message: "Route not found",
  });
});

module.exports = app;
