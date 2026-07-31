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
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">
        Riwayat Transaksi
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Tanggal</th>
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
                  className="py-10 text-center text-gray-500"
                >
                  Belum ada transaksi.
                </td>
              </tr>
            ) : (
              data.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b hover:bg-gray-50 transition"
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
                    <td className="text-center space-x-2">
                      <button
                        onClick={() =>
                          onEdit?.(transaction)
                        }
                        className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          onDelete?.(transaction)
                        }
                        className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
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
    </div>
  );
}