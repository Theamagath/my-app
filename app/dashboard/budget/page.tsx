"use client";

import AddBudgetModal from "@/components/budget/AddBudgetModal";
import BudgetTable from "@/components/budget/BudgetTable";
import { useBudgets } from "@/hooks/useBudgets";

export default function BudgetPage() {
  const {
    budgets,
    loading,
    reload,
  } = useBudgets();

  if (loading) {
    return (
      <div className="p-6">
        Memuat budget...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Budget
          </h1>

          <p className="text-gray-500">
            Kelola budget bulanan.
          </p>
        </div>

        <AddBudgetModal
          onSuccess={reload}
        />
      </div>

      <BudgetTable
        budgets={budgets}
        onReload={reload}
      />
    </div>
  );
}