const { Schema, model } = require("mongoose");

const expenseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      trim: true,
      required: true,
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
    },
  },
  {
    timestamps: true,
  },
);

const Expense = model("Expense", expenseSchema);
module.exports = Expense;
