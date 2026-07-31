"use client";

import type { Transaction } from "@/types/transaction";

interface TransactionTableProps {
  transactions: Transaction[];
  limit?: number;
  showActions?: boolean;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transaction: Transaction) => void;
}

export default function TransactionTable({
  transactions,
  limit,
  showActions = true,
  onEdit,
  onDelete,
}: TransactionTableProps) {
  const data = limit
    ? transactions.slice(0, limit)
    : transactions;

  return (
  <div className="rounded-2xl border bg-white p-6 shadow-sm">
    <h2 className="mb-6 text-xl md:text-2xl font-bold">
      Riwayat Transaksi
    </h2>

    {/* ================= Desktop ================= */}
    <div className="hidden md:block overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            <th className="py-3 text-left">Tanggal</th>
            <th className="text-left">Judul</th>
            <th className="text-left">Kategori</th>
            <th className="text-left">Jenis</th>
            <th className="text-right">Nominal</th>

            {showActions && (
              <th className="text-center">
                Aksi
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={showActions ? 6 : 5}
                className="py-8 text-center text-gray-500"
              >
                Belum ada transaksi.
              </td>
            </tr>
          ) : (
            data.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b transition hover:bg-gray-50"
              >
                <td className="py-4">
                  {transaction.date}
                </td>

                <td>{transaction.title}</td>

                <td>{transaction.category}</td>

                <td>
                  {transaction.type === "income" ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      Pemasukan
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                      Pengeluaran
                    </span>
                  )}
                </td>

                <td className="text-right font-semibold">
                  Rp{" "}
                  {transaction.amount.toLocaleString("id-ID")}
                </td>

                {showActions && (
                  <td className="space-x-2 text-center">
                    <button
                      onClick={() =>
                        onEdit?.(transaction)
                      }
                      className="rounded bg-yellow-500 px-3 py-1 text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        onDelete?.(transaction)
                      }
                      className="rounded bg-red-500 px-3 py-1 text-white"
                    >
                      Hapus
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    {/* ================= Mobile ================= */}

    <div className="space-y-4 md:hidden">
      {data.length === 0 ? (
        <div className="rounded-xl border p-6 text-center text-gray-500">
          Belum ada transaksi.
        </div>
      ) : (
        data.map((transaction) => (
          <div
            key={transaction.id}
            className="rounded-xl border p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">
                  {transaction.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {transaction.date}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  transaction.type === "income"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {transaction.type === "income"
                  ? "Pemasukan"
                  : "Pengeluaran"}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-gray-500">
                {transaction.category}
              </span>

              <span className="font-bold">
                Rp{" "}
                {transaction.amount.toLocaleString(
                  "id-ID"
                )}
              </span>
            </div>

            {showActions && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() =>
                    onEdit?.(transaction)
                  }
                  className="flex-1 rounded-lg bg-yellow-500 py-2 text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    onDelete?.(transaction)
                  }
                  className="flex-1 rounded-lg bg-red-500 py-2 text-white"
                >
                  Hapus
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  </div>
);
}