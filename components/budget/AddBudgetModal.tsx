"use client";

import { useState } from "react";
import { toast } from "sonner";

import BudgetForm from "./BudgetForm";

import { useBudgets } from "@/hooks/useBudgets";
import type { Budget } from "@/types/budget";

interface AddBudgetModalProps {
  onSuccess: () => void | Promise<void>;
}

export default function AddBudgetModal({
  onSuccess,
}: AddBudgetModalProps) {
  const { createBudget } = useBudgets();

  const [open, setOpen] = useState(false);

  async function handleSubmit(
    data: Omit<Budget, "id">
  ) {
    try {
      await createBudget(data);

      await onSuccess();

      toast.success(
        "Budget berhasil ditambahkan."
      );

      setOpen(false);
    } catch (error) {
      console.error(error);

      toast.error(
        "Gagal menambahkan budget."
      );
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
      >
        + Tambah Budget
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Tambah Budget
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-2xl text-gray-500 transition hover:text-black"
              >
                ×
              </button>
            </div>

            <BudgetForm
              submitText="Tambah Budget"
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </>
  );
}