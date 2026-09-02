const { Schema, model } = require("mongoose");

const expenseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      trim: true,
      required: true,
    },
    salaryId: {
      type: Schema.Types.ObjectId,
      ref: "Salary",
      default: null,
    },
    amount: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: [100, "The Max length is 100 characters"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: [500, "The Max length is 500 characters"],
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// // Fetch a user's expenses sorted by date
// expenseSchema.index({ userId: 1, date: -1 });

// // Fetch expenses belonging to a salary period
// expenseSchema.index({ userId: 1, salaryId: 1, date: -1 });

const Expense = model("Expense", expenseSchema);
module.exports = Expense;
