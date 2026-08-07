"use client";

import { useBudgets } from "@/hooks/useBudgets";
import { useTransactions } from "@/hooks/useTransactions";

import { calculateDailyBudget } from "@/lib/calculateDailyBudget";

export default function DailyBudgetProgress() {
  const { budgets } = useBudgets();
  const { transactions } = useTransactions();

  const progress = calculateDailyBudget(
    budgets,
    transactions
  );

  if (progress.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold">
          📅 Budget Hari Ini
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
        📅 Budget Hari Ini
      </h2>

      <div className="space-y-6">
        {progress.map((item, index) => {
          const color =
            item.status === "danger"
              ? "bg-red-500"
              : item.status === "warning"
              ? "bg-yellow-500"
              : "bg-green-500";

          return (
            <div key={`${item.categoryId}-${item.categoryName}-${index}`}>
              <div className="mb-2 flex justify-between">
                <span className="font-semibold">
                  {item.categoryName}
                </span>

                <span className="font-semibold">
                  {item.percentage.toFixed(0)}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`${color} h-full rounded-full transition-all duration-500`}
                  style={{
                    width: `${Math.min(
                      item.percentage,
                      100
                    )}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex justify-between text-sm text-gray-500">
                <span>
                  Rp{" "}
                  {item.spent.toLocaleString(
                    "id-ID"
                  )}
                </span>

                <span>
                  Rp{" "}
                  {item.budget.toLocaleString(
                    "id-ID"
                  )}
                </span>
              </div>

              <div className="mt-2">
                {item.status === "safe" && (
                  <p className="text-sm text-green-600">
                    ✅ Sisa Rp{" "}
                    {item.remaining.toLocaleString(
                      "id-ID"
                    )}
                  </p>
                )}

                {item.status === "warning" && (
                  <p className="text-sm text-yellow-600">
                    ⚠ Budget hampir habis
                  </p>
                )}

                {item.status === "danger" && (
                  <p className="text-sm text-red-600">
                    🚨 Budget harian telah
                    terlampaui
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}