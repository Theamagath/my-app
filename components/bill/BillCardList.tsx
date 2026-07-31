"use client";

import type { Bill } from "@/types/bill";

interface BillCardListProps {
  bills: Bill[];
  onEdit?: (bill: Bill) => void;
  onDelete?: (bill: Bill) => void;
  onPaid?: (bill: Bill) => void;
}

export default function BillCardList({
  bills,
  onEdit,
  onDelete,
  onPaid,
}: BillCardListProps) {
  if (bills.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold">
          Belum Ada Tagihan
        </h2>

        <p className="mt-2 text-gray-500">
          Tambahkan tagihan pertamamu.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {bills.map((bill) => (
        <div
          key={bill.id}
          className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold">
                {bill.name}
              </h3>

              <p className="mt-1 text-gray-500">
                {bill.category}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                bill.status === "active"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {bill.status === "active"
                ? "Aktif"
                : "Lunas"}
            </span>
          </div>

          <div className="mt-6 space-y-2">
            <p className="text-2xl font-bold text-blue-600">
              Rp{" "}
              {bill.amount.toLocaleString(
                "id-ID"
              )}
            </p>

            <p>
              📅 Jatuh Tempo :
              <strong>
                {" "}
                {bill.dueDate}
              </strong>
            </p>

            <p>
              🔄{" "}
              {bill.repeat === "monthly"
                ? "Bulanan"
                : "Tahunan"}
            </p>

            {bill.notes && (
              <p className="text-gray-500">
                📝 {bill.notes}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {bill.status === "active" && (
              <button
                onClick={() =>
                  onPaid?.(bill)
                }
                className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Bayar
              </button>
            )}

            <button
              onClick={() =>
                onEdit?.(bill)
              }
              className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
            >
              Edit
            </button>

            <button
              onClick={() =>
                onDelete?.(bill)
              }
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}