const createSalaryScheduleProvider = require("./providers/createSalarySchedule.provider");
const getSalaryScheduleProvider = require("./providers/getSalarySchedule.provider");
const updateSalaryScheduleProvider = require("./providers/updateSalarySchedule.provider");

async function handleCreateSalarySchedule(req, res) {
  return await createSalaryScheduleProvider(req, res);
}

async function handleUpdateSalarySchedule(req, res) {
  return await updateSalaryScheduleProvider(req, res);
}
async function handleDeleteSalarySchedule(req, res) {}

async function handleGetSalarySchedule(req, res) {
  return await getSalaryScheduleProvider(req, res);
}

module.exports = {
  handleCreateSalarySchedule,
  handleDeleteSalarySchedule,
  handleUpdateSalarySchedule,
  handleGetSalarySchedule,
};
