"use client";

import { useBudgets } from "@/hooks/useBudgets";
import { useTransactions } from "@/hooks/useTransactions";

export default function BudgetProgress() {
  const { budgets } = useBudgets();
  const { transactions } = useTransactions();

  const today = new Date().toISOString().split("T")[0];

  if (budgets.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold">
          Budget Hari Ini
        </h2>

        <p className="text-gray-500">
          Belum ada budget.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Budget Hari Ini
      </h2>

      <div className="space-y-6">
        {budgets.map((budget) => {
          const spentToday = transactions
            .filter(
              (transaction) =>
                transaction.type === "expense" &&
                transaction.category ===
                  budget.categoryName &&
                transaction.date === today
            )
            .reduce(
              (total, transaction) =>
                total + transaction.amount,
              0
            );

          const percentage =
            budget.dailyAmount === 0
              ? 0
              : (spentToday /
                  budget.dailyAmount) *
                100;

          const color =
            percentage >= 100
              ? "bg-red-500"
              : percentage >= 80
              ? "bg-yellow-500"
              : "bg-green-500";

          return (
            <div key={budget.id}>
              <div className="mb-2 flex justify-between">
                <span className="font-semibold">
                  {budget.categoryName}
                </span>

                <span className="text-sm">
                  {percentage.toFixed(0)}%
                </span>
              </div>

              <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`${color} h-full rounded-full transition-all`}
                  style={{
                    width: `${Math.min(
                      percentage,
                      100
                    )}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex justify-between text-sm text-gray-500">
                <span>
                  Rp{" "}
                  {spentToday.toLocaleString(
                    "id-ID"
                  )}
                </span>

                <span>
                  Rp{" "}
                  {budget.dailyAmount.toLocaleString(
                    "id-ID"
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}