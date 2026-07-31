"use client";

import { toast } from "sonner";

import TransactionForm from "./TransactionForm";

import { updateTransaction } from "@/services/transaction.service";
import type { Transaction } from "@/types/transaction";

interface EditTransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  transaction: Transaction;
}

export default function EditTransactionModal({
  open,
  onClose,
  onSuccess,
  transaction,
}: EditTransactionModalProps) {
  if (!open) return null;

  async function handleSubmit(
    data: Omit<Transaction, "id" | "createdAt">
  ) {
    try {
      if (!transaction.id) {
        toast.error("ID transaksi tidak ditemukan.");
        return;
      }

      await updateTransaction(
        transaction.id,
        data
      );

      await onSuccess();

      toast.success(
        "Transaksi berhasil diperbarui."
      );

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        "Gagal memperbarui transaksi."
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Edit Transaksi
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 transition hover:text-black"
          >
            ×
          </button>
        </div>

        <TransactionForm
          initialData={transaction}
          submitText="Simpan Perubahan"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}