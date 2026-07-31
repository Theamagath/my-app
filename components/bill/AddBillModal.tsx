"use client";

import { toast } from "sonner";

import BillForm from "./BillForm";

import { useBills } from "@/hooks/useBills";
import type { Bill } from "@/types/bill";

interface AddBillModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

export default function AddBillModal({
  open,
  onClose,
  onSuccess,
}: AddBillModalProps) {
  const { createBill } = useBills();

  if (!open) return null;

  async function handleSubmit(
    data: Omit<Bill, "id">
  ) {
    try {
      await createBill(data);

      await onSuccess();

      toast.success(
        "Tagihan berhasil ditambahkan."
      );

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        "Gagal menambahkan tagihan."
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl sm:max-w-lg sm:rounded-2xl sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold sm:text-2xl">
            Tambah Tagihan
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <BillForm
          submitText="Simpan Tagihan"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}