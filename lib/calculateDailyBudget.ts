import type { Budget } from "@/types/budget";
import type { Transaction } from "@/types/transaction";

export interface DailyBudgetProgress {
  categoryId: string;
  categoryName: string;

  spent: number;
  budget: number;

  remaining: number;

  percentage: number;

  status: "safe" | "warning" | "danger";
}

export function calculateDailyBudget(
  budgets: Budget[],
  transactions: Transaction[]
): DailyBudgetProgress[] {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  return budgets.map((budget) => {
    const spent = transactions
      .filter(
        (item) =>
          item.type === "expense" &&
          item.category === budget.categoryName &&
          item.date === today
      )
      .reduce(
        (sum, item) => sum + item.amount,
        0
      );

    const percentage =
      budget.dailyAmount === 0
        ? 0
        : (spent / budget.dailyAmount) * 100;

    return {
      categoryId: budget.categoryId,

      categoryName: budget.categoryName,

      spent,

      budget: budget.dailyAmount,

      remaining:
        budget.dailyAmount - spent,

      percentage,

      status:
        percentage >= 100
          ? "danger"
          : percentage >= 80
          ? "warning"
          : "safe",
    };
  });
}