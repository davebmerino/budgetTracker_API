const { Schema, model } = require("mongoose");

const salaryScheduleSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
      unique: true,
    },

    firstPayDay: {
      type: Number,
      required: true,
      min: 1,
      max: 27,
      validate: {
        validator: Number.isInteger,
        message: "First payday must be a whole number",
      },
    },

    secondPayDay: {
      type: Number,
      required: true,
      min: 2,
      max: 31,
      validate: [
        {
          validator: Number.isInteger,
          message: "Second payday must be a whole number",
        },
        {
          validator: function (value) {
            return value > this.firstPayDay;
          },
          message: "Second payday must be after the first payday",
        },
      ],
    },
  },
  { timestamps: true },
);

const SalarySchedule = model("SalarySchedule", salaryScheduleSchema);
module.exports = SalarySchedule;
