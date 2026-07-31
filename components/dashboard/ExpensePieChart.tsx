"use client";

import type { Transaction } from "@/types/transaction";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ExpensePieChartProps {
  transactions: Transaction[];
}

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
];

export default function ExpensePieChart({
  transactions,
}: ExpensePieChartProps) {
  const expenses = transactions.filter(
    (t) => t.type === "expense"
  );

  const categoryMap: Record<string, number> = {};

  expenses.forEach((transaction) => {
    categoryMap[transaction.category] =
      (categoryMap[transaction.category] || 0) +
      transaction.amount;
  });

  const data = Object.entries(categoryMap).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">
          Pengeluaran per Kategori
        </h2>

        <div className="h-[320px] flex items-center justify-center text-gray-400">
          Belum ada data pengeluaran.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">
        Pengeluaran per Kategori
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
  formatter={(value) => [
    `Rp ${Number(value ?? 0).toLocaleString("id-ID")}`,
    "Nominal",
        ]}
            />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}