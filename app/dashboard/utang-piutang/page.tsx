"use client";

import { useState } from "react";
import { toast } from "sonner";

import AddDebtModal from "@/components/debt/AddDebtModal";
import DebtCard from "@/components/debt/DebtCard";

import { useDebts } from "@/hooks/useDebts";

import type { Debt } from "@/types/debt";

export default function DebtPage() {
  const {
    debts,
    loading,
    reload,
    removeDebt,
  } = useDebts();

  const [openAdd, setOpenAdd] =
    useState(false);

  async function handleDelete(
    debt: Debt
  ) {
    if (!debt.id) return;

    const confirmDelete = window.confirm(
      `Hapus data ${debt.person}?`
    );

    if (!confirmDelete) return;

    try {
      await removeDebt(debt.id);

      toast.success(
        "Data berhasil dihapus."
      );

      await reload();
    } catch (error) {
      console.error(error);

      toast.error(
        "Gagal menghapus data."
      );
    }
  }

  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        Memuat data...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              Utang & Piutang
            </h1>

            <p className="text-gray-500">
              Kelola utang dan piutangmu.
            </p>
          </div>

          <button
            onClick={() =>
              setOpenAdd(true)
            }
            className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            + Tambah
          </button>

        </div>

        {debts.length === 0 ? (
          <div className="rounded-2xl border bg-white p-10 text-center">

            <h2 className="text-xl font-semibold">
              Belum Ada Data
            </h2>

            <p className="mt-2 text-gray-500">
              Tambahkan utang atau piutang pertamamu.
            </p>

          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">

            {debts.map((debt) => (
              <DebtCard
                key={debt.id}
                debt={debt}
                onDelete={handleDelete}
              />
            ))}

          </div>
        )}

      </div>

      <AddDebtModal
        open={openAdd}
        onClose={() =>
          setOpenAdd(false)
        }
        onSuccess={reload}
      />
    </>
  );
}