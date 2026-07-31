"use client";

import type { Budget } from "@/types/budget";
import { deleteBudget } from "@/services/budget.service";
import EditBudgetModal from "./EditBudgetModal";

interface BudgetTableProps {
  budgets: Budget[];
  onReload: () => void | Promise<void>;
}

const monthNames = [
  "",
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default function BudgetTable({
  budgets,
  onReload,
}: BudgetTableProps) {
  async function handleDelete(id?: string) {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Yakin ingin menghapus budget ini?"
    );

    if (!confirmDelete) return;

    await deleteBudget(id);
    await onReload();
  }

  if (budgets.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
        Belum ada budget.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">
              Kategori
            </th>

            <th className="px-4 py-3 text-left">
              Budget
            </th>

            <th className="px-4 py-3 text-left">
              Bulan
            </th>

            <th className="px-4 py-3 text-left">
              Tahun
            </th>

            <th className="px-4 py-3 text-center">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody>
          {budgets.map((budget) => (
            <tr
              key={budget.id}
              className="border-t"
            >
              <td className="px-4 py-3">
                {budget.categoryName}
              </td>

              <td className="px-4 py-3">
                Rp{" "}
                {budget.amount.toLocaleString(
                  "id-ID"
                )}
              </td>

              <td className="px-4 py-3">
                {monthNames[budget.month]}
              </td>

              <td className="px-4 py-3">
                {budget.year}
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <EditBudgetModal
                    budget={budget}
                    onSuccess={onReload}
                  />

                  <button
                    onClick={() =>
                      handleDelete(budget.id)
                    }
                    className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}