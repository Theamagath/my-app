"use client";

import { toast } from "sonner";

import TransactionForm from "./TransactionForm";

import { addTransaction } from "@/services/transaction.service";
import type { Transaction } from "@/types/transaction";

import { getBudgets } from "@/services/budget.service";
import { getTransactions } from "@/services/transaction.service";

interface AddTransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

export default function AddTransactionModal({
  open,
  onClose,
  onSuccess,
}: AddTransactionModalProps) {
  if (!open) return null;

  async function handleSubmit(
    data: Omit<Transaction, "id" | "createdAt">
  ) {
    try {
      await addTransaction(data);

      // ===========================
      // CEK BUDGET HARIAN
      // ===========================

      if (data.type === "expense") {
        const budgets = await getBudgets();
        const transactions =
          await getTransactions();

        const today = data.date;

        const budget = budgets.find(
          (item) =>
            item.categoryName ===
            data.category
        );

        if (budget) {
          const spentToday = transactions
            .filter(
              (item) =>
                item.type === "expense" &&
                item.category ===
                  data.category &&
                item.date === today
            )
            .reduce(
              (total, item) =>
                total + item.amount,
              0
            );

          if (
            spentToday >=
            budget.dailyAmount
          ) {
            toast.warning(
              `Budget harian ${budget.categoryName} telah terlampaui.`
            );
          }
        }
      }

      await onSuccess();

      toast.success(
        "Transaksi berhasil ditambahkan."
      );

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        "Gagal menambahkan transaksi."
      );
    }
  }

 return (
  <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
    <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl sm:max-w-lg sm:rounded-2xl sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold sm:text-2xl">
          Tambah Transaksi
        </h2>

        <button
          onClick={onClose}
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
        >
          ✕
        </button>
      </div>

      <TransactionForm
        submitText="Simpan Transaksi"
        onSubmit={handleSubmit}
      />
    </div>
  </div>
);
}