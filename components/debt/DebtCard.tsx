"use client";

import type { Debt } from "@/types/debt";

interface DebtCardProps {
  debt: Debt;

  onPay?: (debt: Debt) => void;
  onEdit?: (debt: Debt) => void;
  onDelete?: (debt: Debt) => void;
}

export default function DebtCard({
  debt,
  onPay,
  onEdit,
  onDelete,
}: DebtCardProps) {
  const percentage =
    debt.amount === 0
      ? 0
      : ((debt.amount - debt.remainingAmount) /
          debt.amount) *
        100;

  const cardColor =
    debt.type === "debt"
      ? "border-red-200"
      : "border-green-200";

  const badgeColor =
    debt.type === "debt"
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700";

  return (
    <div
      className={`rounded-2xl border bg-white p-6 shadow-sm ${cardColor}`}
    >
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold">
            {debt.person}
          </h2>

          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-sm ${badgeColor}`}
          >
            {debt.type === "debt"
              ? "Utang"
              : "Piutang"}
          </span>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">
            Jatuh Tempo
          </p>

          <p className="font-semibold">
            {debt.dueDate}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between">
          <span>Total</span>

          <span className="font-bold">
            Rp{" "}
            {debt.amount.toLocaleString(
              "id-ID"
            )}
          </span>
        </div>

        <div className="mb-2 flex justify-between">
          <span>Sisa</span>

          <span className="font-bold text-red-600">
            Rp{" "}
            {debt.remainingAmount.toLocaleString(
              "id-ID"
            )}
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-blue-600"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <p className="mt-2 text-right text-sm">
          {percentage.toFixed(1)}%
        </p>
      </div>

      {debt.notes && (
        <div className="mt-5 rounded-xl bg-gray-50 p-3 text-sm text-gray-600">
          {debt.notes}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">

        <button
          onClick={() => onPay?.(debt)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Bayar
        </button>

        <button
          onClick={() => onEdit?.(debt)}
          className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete?.(debt)}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Hapus
        </button>

      </div>
    </div>
  );
}