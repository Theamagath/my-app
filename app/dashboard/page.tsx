"use client";

import StatCard from "@/components/dashboard/StatCard";
import FinanceChart from "@/components/dashboard/FinanceChart";
import ExpensePieChart from "@/components/dashboard/ExpensePieChart";
import FinanceStats from "@/components/dashboard/FinanceStats";
import RecentActivity from "@/components/dashboard/RecentActivity";
import TopCategories from "@/components/dashboard/TopCategories";
import QuickActions from "@/components/dashboard/QuickActions";
import DailyBudgetProgress from "@/components/dashboard/DailyBudgetProgress";
import BillReminder from "@/components/dashboard/BillReminder";

import { useTransactions } from "@/hooks/useTransactions";
import { useBills } from "@/hooks/useBills";
import { calculateSummary } from "@/lib/calculate";

export default function DashboardPage() {
  const { transactions, loading } =
    useTransactions();

  const { bills } = useBills();

  const { income, expense, balance } =
    calculateSummary(transactions);

  if (loading) {
    return (
      <div className="flex h-[350px] items-center justify-center">
        <p className="text-lg text-gray-500">
          Memuat dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold">
          Selamat Datang 👋
        </h1>

        <p className="mt-2 text-blue-100">
          Pantau kondisi keuanganmu hari ini.
        </p>
      </div>

      {/* Ringkasan */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

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

      {/* Grafik */}
      <FinanceChart
        transactions={transactions}
      />

      {/* Statistik */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">

        <ExpensePieChart
          transactions={transactions}
        />

        <FinanceStats
          transactions={transactions}
        />

        <DailyBudgetProgress />

      </div>

      {/* Aktivitas */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

        <RecentActivity
          transactions={transactions}
        />

        <TopCategories
          transactions={transactions}
        />

      </div>

      {/* Tagihan */}
      <BillReminder bills={bills} />

      {/* Quick Action */}
      <QuickActions />

    </div>
  );
}