"use client";

import type { Transaction } from "@/types/transaction";

interface TopCategoriesProps {
  transactions: Transaction[];
}

export default function TopCategories({
  transactions,
}: TopCategoriesProps) {
  const expenseTransactions = transactions.filter(
    (item) => item.type === "expense"
  );

  const categoryTotals: Record<string, number> = {};

  expenseTransactions.forEach((item) => {
    categoryTotals[item.category] =
      (categoryTotals[item.category] || 0) +
      item.amount;
  });

  const topCategories = Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  const maxAmount =
    topCategories.length > 0
      ? topCategories[0].amount
      : 1;

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Top Pengeluaran
      </h2>

      {topCategories.length === 0 ? (
        <p className="text-gray-500">
          Belum ada data pengeluaran.
        </p>
      ) : (
        <div className="space-y-5">
          {topCategories.map((item) => (
            <div key={item.category}>
              <div className="mb-2 flex justify-between">
                <span className="font-medium">
                  {item.category}
                </span>

                <span className="text-sm font-semibold">
                  Rp{" "}
                  {item.amount.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={{
                    width: `${
                      (item.amount / maxAmount) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}