const express = require("express");
const authenticateToken = require("../../middleware/authenticateToken");
const validateRequest = require("../../middleware/validateRequest.middleware");
const salaryScheduleController = require("./salarySchedule.controller");

const createSalaryScheduleValidator = require("./validators/createSalarySchedule.validator");
const deleteSalaryScheduleValidator = require("./validators/deleteSalarySchedule.validator");

const updateSalaryScheduleValidator = require("./validators/updateSalarySchedule.validator");
const getSalaryScheduleValidator = require("./validators/getSalarySchedule.validator");

const salaryScheduleRoute = express.Router();

salaryScheduleRoute.use(authenticateToken);

salaryScheduleRoute.post(
  "/salary-date",
  createSalaryScheduleValidator,
  validateRequest,
  salaryScheduleController.handleCreateSalarySchedule,
);

// salaryScheduleRoute.patch(
//   "/salary-date",
//   updateSalaryScheduleValidator,
//   validateRequest,
//   salaryScheduleController.handleUpdateSalarySchedule,
// );

salaryScheduleRoute.patch(
  "/salary-date",
  (req, res, next) => {
    console.log("SALARY SCHEDULE PATCH ROUTE HIT");
    next();
  },
  updateSalaryScheduleValidator,
  validateRequest,
  salaryScheduleController.handleUpdateSalarySchedule,
);

salaryScheduleRoute.delete(
  "/salary-date",
  deleteSalaryScheduleValidator,
  validateRequest,
  salaryScheduleController.handleDeleteSalarySchedule,
);

salaryScheduleRoute.get(
  "/salary-date",
  getSalaryScheduleValidator,
  validateRequest,
  salaryScheduleController.handleGetSalarySchedule,
);

module.exports = salaryScheduleRoute;
