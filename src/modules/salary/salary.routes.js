const express = require("express");
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const createSalaryValidator = require("./validators/createSalary.validator.js");
const authenticateToken = require("../../middleware/authenticateToken.js");
const salaryController = require("./salary.controller.js");

const salaryRoutes = express.Router();

salaryRoutes.use(authenticateToken);

salaryRoutes.post("/salary", createSalaryValidator, (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return salaryController.handleCreateSalary(req, res);
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = salaryRoutes;
