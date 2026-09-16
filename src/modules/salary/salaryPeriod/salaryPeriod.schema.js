const { Schema, model } = require("mongoose");

const newSalaryPeriod = new Schema({});

const SalaryPeriod = model("SalaryPeriod");

module.exports = SalaryPeriod;
