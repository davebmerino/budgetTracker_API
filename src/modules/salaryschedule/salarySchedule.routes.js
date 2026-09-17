const express = require("express");
const authenticateToken = require("../../middleware/authenticateToken");
const validateRequest = require("../../middleware/validateRequest.middleware");
const salaryScheduleController = require("./salarySchedule.controller");

const createSalaryScheduleValidator = require("./validators/createSalarySchedule.validator");

const salaryScheduleRoute = express.Router();

salaryScheduleRoute.use(authenticateToken);

salaryScheduleRoute.post(
  "/salary-date",
  createSalaryScheduleValidator,
  validateRequest,
  salaryScheduleController.handleCreateSalarySchedule,
);

module.exports = salaryScheduleRoute;
