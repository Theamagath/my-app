"use client";

import StatCard from "@/components/dashboard/StatCard";
import FinanceChart from "@/components/dashboard/FinanceChart";
import ExpensePieChart from "@/components/dashboard/ExpensePieChart";
import FinanceStats from "@/components/dashboard/FinanceStats";
import TransactionTable from "@/components/transaction/TransactionTable";
import BudgetProgress from "@/components/dashboard/BudgetProgress";
import { useTransactions } from "@/hooks/useTransactions";
import { calculateSummary } from "@/lib/calculate";
import RecentActivity from "@/components/dashboard/RecentActivity";
import TopCategories from "@/components/dashboard/TopCategories";
import QuickActions from "@/components/dashboard/QuickActions";
import DailyBudgetProgress from "@/components/dashboard/DailyBudgetProgress";


export default function DashboardPage() {
  const { transactions, loading } = useTransactions();

  const { income, expense, balance } =
    calculateSummary(transactions);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <p className="text-gray-500 text-lg">
          Memuat data...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Pantau kondisi keuanganmu secara keseluruhan.
        </p>
      </div>

      {/* Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Saldo"
          amount={`Rp ${balance.toLocaleString("id-ID")}`}
          color="text-blue-600"
        />

        <StatCard
          title="Pemasukan"
          amount={`Rp ${income.toLocaleString("id-ID")}`}
          color="text-green-600"
        />

        <StatCard
          title="Pengeluaran"
          amount={`Rp ${expense.toLocaleString("id-ID")}`}
          color="text-red-600"
        />
      </div>

      {/* Grafik Bulanan */}
      <FinanceChart
        transactions={transactions}
      />

      {/* Pie Chart + Statistik */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
  <ExpensePieChart
    transactions={transactions}
  />

  <FinanceStats
    transactions={transactions}
  />

  <DailyBudgetProgress />
</div>

      {/* Transaksi Terbaru */}
      <RecentActivity
    transactions={transactions}
/>
<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
  <RecentActivity
    transactions={transactions}
  />

  <TopCategories
    transactions={transactions}
  />
</div>

<QuickActions />
    </div>
    
  );
}