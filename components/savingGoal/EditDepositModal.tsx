"use client";

import { toast } from "sonner";

import DepositForm from "./DepositForm";

import { updateSavingDeposit } from "@/services/savingDeposit.service";

import type { SavingDeposit } from "@/types/savingDeposit";

interface EditDepositModalProps {
  open: boolean;
  deposit: SavingDeposit | null;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

export default function EditDepositModal({
  open,
  deposit,
  onClose,
  onSuccess,
}: EditDepositModalProps) {
  if (!open || !deposit) {
    return null;
  }

  // Simpan ke variabel non-null agar TypeScript tidak menganggap nullable
  const currentDeposit: SavingDeposit = deposit;

  async function handleSubmit(
    data: Omit<SavingDeposit, "id">
  ) {
    try {
      await updateSavingDeposit(
        currentDeposit.id!,
        data
      );

      await onSuccess();

      toast.success(
        "Setoran berhasil diperbarui."
      );

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        "Gagal memperbarui setoran."
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl sm:max-w-xl sm:rounded-2xl sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Edit Setoran
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <DepositForm
          initialData={currentDeposit}
          submitText="Update Setoran"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}