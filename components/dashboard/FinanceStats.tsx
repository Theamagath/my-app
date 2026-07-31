"use client";

import type { Transaction } from "@/types/transaction";

interface Props {
  transactions: Transaction[];
}

export default function FinanceStats({
  transactions,
}: Props) {
  const totalTransaction = transactions.length;

  const expense = transactions.filter(
    (t) => t.type === "expense"
  );

  const biggestExpense =
    expense.length > 0
      ? expense.reduce((a, b) =>
          a.amount > b.amount ? a : b
        )
      : null;

  const categoryCount: Record<string, number> = {};

  expense.forEach((t) => {
    categoryCount[t.category] =
      (categoryCount[t.category] || 0) + 1;
  });

  const favoriteCategory =
    Object.entries(categoryCount).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] ?? "-";

  const averageExpense =
    expense.length > 0
      ? expense.reduce((a, b) => a + b.amount, 0) /
        expense.length
      : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h2 className="text-xl font-bold mb-6">
        Statistik
      </h2>

      <div className="space-y-5">
        <div className="flex justify-between">
          <span>Total Transaksi</span>

          <span className="font-bold">
            {totalTransaction}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Kategori Favorit</span>

          <span className="font-bold">
            {favoriteCategory}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Pengeluaran Terbesar</span>

          <span className="font-bold text-red-600">
            {biggestExpense
              ? `Rp ${biggestExpense.amount.toLocaleString(
                  "id-ID"
                )}`
              : "-"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Rata-rata Pengeluaran</span>

          <span className="font-bold">
            Rp{" "}
            {averageExpense.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  );
}