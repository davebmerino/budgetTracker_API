const express = require("express");
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const createSalaryValidator = require("./validators/createSalary.validator.js");
const authenticateToken = require("../../middleware/authenticateToken.js");
const salaryController = require("./salary.controller.js");
const updateSalaryValidator = require("./validators/updateSalary.validator.js");
const deleteSalaryValidator = require("./validators/deleteSalary.validator.js");
const getSalaryValidator = require("./validators/getSalary.validator.js");

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

salaryRoutes.patch("/salary", updateSalaryValidator, (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return salaryController.handleUpdateSalary(req, res);
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

salaryRoutes.delete("/salary", deleteSalaryValidator, (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return salaryController.handleDeleteSalary(req, res);
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

salaryRoutes.get("/salary", getSalaryValidator, (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return salaryController.handleGetSalary(req, res);
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = salaryRoutes;
