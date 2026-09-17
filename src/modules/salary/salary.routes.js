const express = require("express");
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const createSalaryValidator = require("./validators/createSalary.validator.js");
const authenticateToken = require("../../middleware/authenticateToken.js");
const salaryController = require("./salary.controller.js");
const updateSalaryValidator = require("./validators/updateSalary.validator.js");
const deleteSalaryValidator = require("./validators/deleteSalary.validator.js");
const getSalaryValidator = require("./validators/getSalary.validator.js");
const validateRequest = require("../../middleware/validateRequest.middleware.js");

const salaryRoutes = express.Router();

salaryRoutes.use(authenticateToken);

salaryRoutes.post(
  "/salary",
  createSalaryValidator,
  validateRequest,
  salaryController.handleCreateSalary,
);

salaryRoutes.patch(
  "/salary",
  updateSalaryValidator,
  validateRequest,
  salaryController.handleUpdateSalary,
);

salaryRoutes.delete(
  "/salary",
  deleteSalaryValidator,
  validateRequest,
  salaryController.handleDeleteSalary,
);

salaryRoutes.get(
  "/salary",
  getSalaryValidator,
  validateRequest,
  salaryController.handleGetSalary,
);

module.exports = salaryRoutes;
