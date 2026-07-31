"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { addSavingDeposit } from "@/services/savingDeposit.service";
import { addTransaction } from "@/services/transaction.service";

import type { SavingGoal } from "@/types/savingGoal";

interface AddDepositModalProps {
  open: boolean;
  goal: SavingGoal | null;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

export default function AddDepositModal({
  open,
  goal,
  onClose,
  onSuccess,
}: AddDepositModalProps) {
  const [amount, setAmount] = useState(0);
  const [notes, setNotes] = useState("");
  const [saveTransaction, setSaveTransaction] =
    useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setAmount(0);
      setNotes("");
      setSaveTransaction(true);
    }
  }, [open]);

  if (!open || !goal) return null;

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!goal) return;

    if (amount <= 0) {
      toast.error(
        "Nominal harus lebih dari 0."
      );
      return;
    }

    setLoading(true);

    try {
      await addSavingDeposit({
        goalId: goal.id!,
        amount,
        date: new Date()
          .toISOString()
          .split("T")[0],
        notes,
        createdAt:
          new Date().toISOString(),
      });

      if (saveTransaction) {
        await addTransaction({
          title: `Tabungan - ${goal.name}`,
          amount,
          category: "Tabungan",
          type: "expense",
          date: new Date()
            .toISOString()
            .split("T")[0],
        });
      }

      toast.success(
        "Setoran berhasil ditambahkan."
      );

      await onSuccess();

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        "Gagal menambahkan setoran."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl sm:max-w-lg sm:rounded-2xl sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Tambah Setoran
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block font-medium">
              Target Tabungan
            </label>

            <input
              disabled
              value={goal.name}
              className="w-full rounded-xl border bg-gray-100 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Nominal Setoran
            </label>

            <input
              type="number"
              min={1}
              value={amount}
              onChange={(e) =>
                setAmount(
                  Number(e.target.value)
                )
              }
              className="w-full rounded-xl border px-4 py-3"
              placeholder="500000"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Catatan
            </label>

            <textarea
              rows={3}
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
              className="w-full rounded-xl border px-4 py-3"
              placeholder="Opsional"
            />
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={saveTransaction}
              onChange={(e) =>
                setSaveTransaction(
                  e.target.checked
                )
              }
            />

            Catat juga sebagai transaksi
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading
              ? "Menyimpan..."
              : "Simpan Setoran"}
          </button>
        </form>
      </div>
    </div>
  );
}