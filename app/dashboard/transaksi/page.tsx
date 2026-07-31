"use client";

import { useState } from "react";

import AddTransactionModal from "@/components/transaction/AddTransactionModal";
import TransactionTable from "@/components/transaction/TransactionTable";

import { useTransactions } from "@/hooks/useTransactions";
import { deleteTransaction } from "@/services/transaction.service";

import type { Transaction } from "@/types/transaction";

export default function TransaksiPage() {
  const {
    transactions,
    loading,
    reload,
  } = useTransactions();

  const [openAdd, setOpenAdd] =
    useState(false);

  async function handleDelete(
    transaction: Transaction
  ) {
    if (!transaction.id) return;

    const confirmDelete = window.confirm(
      `Hapus transaksi "${transaction.title}"?`
    );

    if (!confirmDelete) return;

    await deleteTransaction(transaction.id);

    await reload();
  }

  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <p className="text-gray-500">
          Memuat transaksi...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              Transaksi
            </h1>

            <p className="text-sm text-gray-500 md:text-base">
              Kelola semua pemasukan dan pengeluaran.
            </p>
          </div>

          <button
            onClick={() => setOpenAdd(true)}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700 sm:w-auto"
          >
            + Tambah Transaksi
          </button>
        </div>

        <TransactionTable
          transactions={transactions}
          showActions
          onDelete={handleDelete}
        />
      </div>

      <AddTransactionModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={reload}
      />
    </>
  );
}