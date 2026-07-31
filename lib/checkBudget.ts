import type { Budget } from "@/types/budget";
import type { Transaction } from "@/types/transaction";

export interface BudgetAlert {
  percentage: number;
  spent: number;
  remaining: number;
  status: "safe" | "warning" | "danger";
}

export function checkBudget(
  transaction: Omit<Transaction, "id" | "createdAt">,
  budgets: Budget[],
  transactions: Transaction[]
): BudgetAlert | null {
  if (transaction.type !== "expense") {
    return null;
  }

  const budget = budgets.find(
    (item) =>
      item.categoryName === transaction.category
  );

  if (!budget) {
    return null;
  }

  const spent =
    transactions
      .filter(
        (item) =>
          item.type === "expense" &&
          item.category === transaction.category
      )
      .reduce(
        (total, item) =>
          total + item.amount,
        0
      ) + transaction.amount;

  const percentage =
    (spent / budget.amount) * 100;

  const remaining =
    budget.amount - spent;

  return {
    percentage,
    spent,
    remaining,
    status:
      percentage >= 100
        ? "danger"
        : percentage >= 80
        ? "warning"
        : "safe",
  };
}