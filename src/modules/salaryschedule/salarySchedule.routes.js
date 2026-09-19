const express = require("express");
const authenticateToken = require("../../middleware/authenticateToken");
const validateRequest = require("../../middleware/validateRequest.middleware");
const salaryScheduleController = require("./salarySchedule.controller");

const createSalaryScheduleValidator = require("./validators/createSalarySchedule.validator");
const updateExpenseValidator = require("../expenses/validators/updateExpense.validator");
const deleteExpenseValidator = require("../expenses/validators/deleteExpense.validator");
const getExpensesValidator = require("../expenses/validators/getExpense.validator");

const salaryScheduleRoute = express.Router();

salaryScheduleRoute.use(authenticateToken);

salaryScheduleRoute.post(
  "/salary-date",
  createSalaryScheduleValidator,
  validateRequest,
  salaryScheduleController.handleCreateSalarySchedule,
);

salaryScheduleRoute.patch(
  "/salary-date",
  updateExpenseValidator,
  validateRequest,
  salaryScheduleController.handleUpdateSalarySchedule,
);

salaryScheduleRoute.delete(
  "/salary-date",
  deleteExpenseValidator,
  validateRequest,
  salaryScheduleController.handleDeleteSalarySchedule,
);

salaryScheduleRoute.get(
  "/salary-date",
  getExpensesValidator,
  validateRequest,
  salaryScheduleController.handleGetSalarySchedule,
);

module.exports = salaryScheduleRoute;
