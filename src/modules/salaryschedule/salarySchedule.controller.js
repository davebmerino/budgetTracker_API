const createSalaryScheduleProvider = require("./providers/createSalarySchedule.provider");
const updateSalaryScheduleProvider = require("./providers/updateSalarySchedule.provider");

async function handleCreateSalarySchedule(req, res) {
  return await createSalaryScheduleProvider(req, res);
}

async function handleUpdateSalarySchedule(req, res) {
  return await updateSalaryScheduleProvider(req, res);
}
async function handleDeleteSalarySchedule(params) {}

async function handleGetSalarySchedule(params) {}

module.exports = {
  handleCreateSalarySchedule,
  handleDeleteSalarySchedule,
  handleUpdateSalarySchedule,
  handleGetSalarySchedule,
};
