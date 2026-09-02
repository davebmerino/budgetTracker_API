const express = require("express");
const { validationResult } = require("express-validator");

const createUserValidator = require("./validator/createUser.validator.js");
const userController = require("./user.controller.js");
const { StatusCodes } = require("http-status-codes");

const userRoutes = express.Router();

userRoutes.post("/user", createUserValidator, (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return userController.handleCreateUser(req, res);
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = userRoutes;
