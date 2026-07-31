import type { Transaction } from "@/types/transaction";

export function calculateSummary(transactions: Transaction[]) {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  return {
    income,
    expense,
    balance: income - expense,
  };
}