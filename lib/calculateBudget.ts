import type { Budget } from "@/types/budget";
import type { Transaction } from "@/types/transaction";

export interface BudgetProgress {
  categoryId: string;
  categoryName: string;
  budget: number;
  spent: number;
  remaining: number;
  percentage: number;
}

export function calculateBudgetProgress(
  budgets: Budget[],
  transactions: Transaction[]
): BudgetProgress[] {
  return budgets.map((budget) => {
    const spent = transactions
      .filter(
        (transaction) =>
          transaction.type === "expense" &&
          transaction.category === budget.categoryName
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );

    const remaining = budget.amount - spent;

    const percentage =
      budget.amount === 0
        ? 0
        : (spent / budget.amount) * 100;

    return {
      categoryId: budget.categoryId,
      categoryName: budget.categoryName,
      budget: budget.amount,
      spent,
      remaining,
      percentage,
    };
  });
}