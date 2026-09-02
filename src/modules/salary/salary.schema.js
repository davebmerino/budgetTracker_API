const { Schema, model } = require("mongoose");

const salarySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },

    amount: {
      type: Number,
      required: true,
      min: [0.01, "Salary amount must be greater than 0"],
    },

    payDate: {
      type: Date,
      required: true,
    },

    periodStart: {
      type: Date,
      required: true,
    },

    periodEnd: {
      type: Date,
      required: true,
    },

    payPeriod: {
      type: String,
      enum: ["first-half", "second-half"],
      required: true,
    },

    notes: {
      type: String,
      trim: true,
      maxLength: [500, "Notes must not exceed 500 characters"],
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

salarySchema.index({ userId: 1, payDate: -1 });

// Prevent duplicate salary records for the same payday
salarySchema.index({ userId: 1, payDate: 1 }, { unique: true });

const Salary = model("Salary", salarySchema);

module.exports = Salary;
