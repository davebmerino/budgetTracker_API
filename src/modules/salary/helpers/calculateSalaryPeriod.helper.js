function calculateSalaryPeriod(payDate, payPeriod, schedule) {
  const date = new Date(payDate);

  if (payDate == null || Number.isNaN(date.getTime())) {
    throw new Error("Invalid pay date");
  }

  const { firstPayDay, secondPayDay } = schedule;

  if (
    !Number.isInteger(firstPayDay) ||
    !Number.isInteger(secondPayDay) ||
    firstPayDay < 1 ||
    firstPayDay > 27 ||
    secondPayDay <= firstPayDay ||
    secondPayDay > 31
  ) {
    throw new Error("Invalid salary schedule");
  }

  if (!["first-half", "second-half"].includes(payPeriod)) {
    throw new Error("Invalid salary pay period");
  }

  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();

  // Clamp days such as February 30 to the month's last day.
  function getScheduledDate(year, month, day) {
    const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

    return new Date(Date.UTC(year, month, Math.min(day, lastDay)));
  }

  const isFirstPayment = payPeriod === "first-half";

  const scheduledPayDate = getScheduledDate(
    year,
    month,
    isFirstPayment ? firstPayDay : secondPayDay,
  );

  // Validate against the user's schedule, not fixed 15/30 dates.
  if (date.getUTCDate() !== scheduledPayDate.getUTCDate()) {
    throw new Error(
      `Pay date must be ${scheduledPayDate
        .toISOString()
        .slice(0, 10)} for this pay period`,
    );
  }

  const nextPayDate = isFirstPayment
    ? getScheduledDate(year, month, secondPayDay)
    : getScheduledDate(year, month + 1, firstPayDay);

  return {
    periodStart: scheduledPayDate,
    periodEnd: new Date(nextPayDate.getTime() - 1),
  };
}

module.exports = calculateSalaryPeriod;
