const express = require("express");
const authController = require("./auth.controller.js");
const loginValidator = require("./validator/login.validator.js");
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const loginRouter = express.Router();

loginRouter.post("/login", loginValidator, (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return authController.handleLogin(req, res);
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = loginRouter;
