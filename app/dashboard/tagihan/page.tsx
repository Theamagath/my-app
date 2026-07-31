"use client";

import { useState } from "react";
import { toast } from "sonner";

import AddBillModal from "@/components/bill/AddBillModal";
import BillCardList from "@/components/bill/BillCardList";

import { useBills } from "@/hooks/useBills";
import { updateBill } from "@/services/bill.service";

import type { Bill } from "@/types/bill";

export default function TagihanPage() {
  const {
    bills,
    loading,
    reload,
    removeBill,
  } = useBills();

  const [open, setOpen] = useState(false);

  async function handleDelete(
    bill: Bill
  ) {
    if (!bill.id) return;

    if (
      !window.confirm(
        `Hapus tagihan "${bill.name}"?`
      )
    )
      return;

    await removeBill(bill.id);

    toast.success(
      "Tagihan berhasil dihapus."
    );
  }

  async function handlePaid(
    bill: Bill
  ) {
    if (!bill.id) return;

    await updateBill(bill.id, {
      ...bill,
      status: "paid",
    });

    toast.success(
      "Tagihan berhasil ditandai lunas."
    );

    await reload();
  }

  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        Memuat tagihan...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Tagihan
            </h1>

            <p className="text-gray-500">
              Kelola seluruh tagihan
              bulanan dan tahunan.
            </p>
          </div>

          <button
            onClick={() =>
              setOpen(true)
            }
            className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            + Tambah Tagihan
          </button>
        </div>

        <BillCardList
          bills={bills}
          onDelete={handleDelete}
          onPaid={handlePaid}
        />
      </div>

      <AddBillModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
        onSuccess={reload}
      />
    </>
  );
}