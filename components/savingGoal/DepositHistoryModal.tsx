"use client";

import { toast } from "sonner";

import { useSavingDeposits } from "@/hooks/useSavingDeposits";
import { deleteSavingDeposit } from "@/services/savingDeposit.service";

import type { SavingGoal } from "@/types/savingGoal";

interface DepositHistoryModalProps {
  open: boolean;
  goal: SavingGoal | null;
  onClose: () => void;
}

export default function DepositHistoryModal({
  open,
  goal,
  onClose,
}: DepositHistoryModalProps) {
  const { deposits, loading, reload } =
    useSavingDeposits(goal?.id ?? "");

  if (!open || !goal) return null;

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm(
      "Hapus riwayat setoran?"
    );

    if (!confirmDelete) return;

    try {
      await deleteSavingDeposit(id);

      toast.success(
        "Riwayat berhasil dihapus."
      );

      await reload();
    } catch (error) {
      console.error(error);

      toast.error(
        "Gagal menghapus riwayat."
      );
    }
  }

  const totalDeposit = deposits.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl sm:max-w-2xl sm:rounded-2xl sm:p-6">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Riwayat Setoran
            </h2>

            <p className="text-gray-500">
              {goal.icon} {goal.name}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Ringkasan */}

        <div className="mb-6 rounded-xl bg-slate-100 p-4">
          <div className="grid grid-cols-2 gap-4">

            <div>
              <p className="text-sm text-gray-500">
                Total Setoran
              </p>

              <p className="text-xl font-bold text-blue-600">
                Rp{" "}
                {totalDeposit.toLocaleString(
                  "id-ID"
                )}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Jumlah Setoran
              </p>

              <p className="text-xl font-bold">
                {deposits.length}
              </p>
            </div>

          </div>
        </div>

        {/* List */}

        {loading ? (
          <div className="py-10 text-center">
            Memuat...
          </div>
        ) : deposits.length === 0 ? (
          <div className="rounded-xl border p-8 text-center text-gray-500">
            Belum ada riwayat setoran.
          </div>
        ) : (
          <div className="space-y-4">
            {deposits.map((deposit) => (
              <div
                key={deposit.id}
                className="rounded-xl border p-4"
              >
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-lg font-bold text-green-600">
                      + Rp{" "}
                      {deposit.amount.toLocaleString(
                        "id-ID"
                      )}
                    </p>

                    <p className="text-sm text-gray-500">
                      {deposit.date}
                    </p>

                    {deposit.notes && (
                      <p className="mt-1 text-sm">
                        {deposit.notes}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      handleDelete(
                        deposit.id!
                      )
                    }
                    className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    Hapus
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}