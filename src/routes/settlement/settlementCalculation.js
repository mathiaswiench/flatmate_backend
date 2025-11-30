export default function calculateSettlement(totalDays, flatmates) {
  // arrays to store flatmates info
  const names = [];
  const expenditures = [];
  const daysAbsent = [];

  // Gather info for each flatmate
  for (let i = 0; i < flatmates.length; i++) {
    names.push(flatmates[i]["name"]);
    expenditures.push(parseFloat(flatmates[i]["expenditure"]));
    daysAbsent.push(parseInt(flatmates[i]["daysAbsent"]));
  }

  // Calculate expenses
  const { totalExpenditure, dailyCostPerPerson, individualCosts } =
    calculateExpenses(names, expenditures, daysAbsent, totalDays);

  console.log(
    `\nThe total expenditure for the flat is: ${totalExpenditure.toFixed(2)}`,
  );
  console.log(
    `The daily cost per person is: ${dailyCostPerPerson.toFixed(2)}\n`,
  );

  for (const [name, cost] of Object.entries(individualCosts)) {
    const status = cost > 0 ? "receives" : "owes";
    console.log(`${name} ${status}: ${Math.abs(cost).toFixed(2)}`);
  }

  // who owes who
  const settlements = settleDebts(individualCosts);

  console.log("\nSettlements:");
  for (const settlement of settlements) {
    console.log(settlement);
  }

  return settlements;
}

function calculateExpenses(names, expenditures, daysAbsent, totalDays) {
  // Calculate total present days for each person
  const totalPresentDays = daysAbsent.map((absent) => totalDays - absent);

  // Calculate total present days for all flatmates
  const sumTotalPresentDays = totalPresentDays.reduce(
    (sum, days) => sum + days,
    0,
  );

  // Calculate the total expenditure
  const totalExpenditure = expenditures.reduce((sum, exp) => sum + exp, 0);

  // Calculate the share per day for each flatmate
  const individualSharePerDay = totalExpenditure / sumTotalPresentDays;

  // Calculate individual total shares
  const individualTotalShares = totalPresentDays.map(
    (present) => individualSharePerDay * present,
  );

  // Calculate individual costs and amounts owed or to be reimbursed
  const individualCosts = {};
  for (let i = 0; i < names.length; i++) {
    individualCosts[names[i]] = expenditures[i] - individualTotalShares[i];
  }

  return {
    totalExpenditure,
    dailyCostPerPerson: individualSharePerDay,
    individualCosts,
  };
}

function settleDebts(individualCosts) {
  // Split into two groups: 1) who owe money 2) who are owed money
  const debtors = {};
  const creditors = {};

  for (const [name, cost] of Object.entries(individualCosts)) {
    if (cost < 0) {
      debtors[name] = -cost;
    } else if (cost > 0) {
      creditors[name] = cost;
    }
  }

  const settlements = [];

  // settling debts
  while (Object.keys(debtors).length > 0 && Object.keys(creditors).length > 0) {
    // Find the debtor with the smallest debt and the creditor who is owed the most
    const debtor = Object.entries(debtors).reduce((min, curr) =>
      curr[1] < min[1] ? curr : min,
    )[0];
    const debtAmount = debtors[debtor];

    const creditor = Object.entries(creditors).reduce((max, curr) =>
      curr[1] > max[1] ? curr : max,
    )[0];
    const creditAmount = creditors[creditor];

    // Calculate amount
    const transactionAmount = Math.min(debtAmount, creditAmount);

    // Record the transaction
    settlements.push(
      `${debtor} owes ${creditor}: ${transactionAmount.toFixed(2)}`,
    );

    // Update amounts
    debtors[debtor] -= transactionAmount;
    creditors[creditor] -= transactionAmount;

    // If 1) debt is settled, remove them from list
    if (debtors[debtor] === 0) {
      delete debtors[debtor];
    }

    // If 2) is repaid, remove them from list
    if (creditors[creditor] === 0) {
      delete creditors[creditor];
    }
  }

  return settlements;
}
