"use client";

import type { Transaction } from "@/types/transaction";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

interface FinanceChartProps {
  transactions: Transaction[];
}

export default function FinanceChart({
  transactions,
}: FinanceChartProps) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const monthlyData = monthNames.map((month, index) => {
    const income = transactions
      .filter((transaction) => {
        const date = new Date(transaction.date);

        return (
          date.getMonth() === index &&
          transaction.type === "income"
        );
      })
      .reduce((total, transaction) => total + transaction.amount, 0);

    const expense = transactions
      .filter((transaction) => {
        const date = new Date(transaction.date);

        return (
          date.getMonth() === index &&
          transaction.type === "expense"
        );
      })
      .reduce((total, transaction) => total + transaction.amount, 0);

    return {
      month,
      income,
      expense,
    };
  });

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">
        Grafik Keuangan Bulanan
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip
            formatter={(value) => [
              `Rp ${Number(value ?? 0).toLocaleString("id-ID")}`,
              "",
            ]}
          />

          <Legend />

          <Bar
            dataKey="income"
            name="Pemasukan"
            fill="#22c55e"
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="expense"
            name="Pengeluaran"
            fill="#ef4444"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}