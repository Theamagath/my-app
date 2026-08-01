"use client";

import { toast } from "sonner";

import DebtForm from "./DebtForm";

import { useDebts } from "@/hooks/useDebts";

import type { Debt } from "@/types/debt";

interface AddDebtModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

export default function AddDebtModal({
  open,
  onClose,
  onSuccess,
}: AddDebtModalProps) {
  const { createDebt } = useDebts();

  if (!open) return null;

  async function handleSubmit(
    data: Omit<Debt, "id">
  ) {
    try {
      await createDebt(data);

      await onSuccess();

      toast.success(
        "Data berhasil ditambahkan."
      );

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        "Gagal menambahkan data."
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl sm:max-w-xl sm:rounded-2xl sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Tambah Utang / Piutang
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <DebtForm
          submitText="Simpan"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}