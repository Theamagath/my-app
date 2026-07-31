"use client";

import { useState } from "react";

import BudgetForm from "./BudgetForm";
import { useBudgets } from "@/hooks/useBudgets";
import type { Budget } from "@/types/budget";

interface EditBudgetModalProps {
  budget: Budget;
  onSuccess: () => void | Promise<void>;
}

export default function EditBudgetModal({
  budget,
  onSuccess,
}: EditBudgetModalProps) {
  const { editBudget } = useBudgets();
  const [open, setOpen] = useState(false);

  async function handleSubmit(
    data: Omit<Budget, "id">
  ) {
    if (!budget.id) return;

    await editBudget(budget.id, data);
    await onSuccess();
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Edit Budget
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-xl text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <BudgetForm
              initialData={budget}
              submitText="Simpan Perubahan"
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </>
  );
}