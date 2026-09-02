function calculateSalaryPeriod(payDate, payPeriod) {
  const date = new Date(payDate);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid pay date");
  }

  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  if (payPeriod === "first-half") {
    if (day !== 15) {
      throw new Error("The first-half salary pay date must be on the 15th");
    }

    return {
      periodStart: new Date(Date.UTC(year, month, 16, 0, 0, 0)),
      periodEnd: new Date(Date.UTC(year, month, 29, 23, 59, 59, 999)),
    };
  }

  if (payPeriod === "second-half") {
    if (day !== 30) {
      throw new Error("The second-half salary pay date must be on the 30th");
    }

    return {
      periodStart: new Date(Date.UTC(year, month + 1, 1, 0, 0, 0)),
      periodEnd: new Date(Date.UTC(year, month + 1, 14, 23, 59, 59, 999)),
    };
  }

  throw new Error("Invalid salary pay period");
}

module.exports = calculateSalaryPeriod;
