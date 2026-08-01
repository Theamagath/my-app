"use client";

import { toast } from "sonner";

import SavingGoalForm from "./SavingGoalForm";

import { useSavingGoals } from "@/hooks/useSavingGoals";
import type { SavingGoal } from "@/types/savingGoal";

interface EditSavingGoalModalProps {
  open: boolean;
  goal: SavingGoal | null;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

export default function EditSavingGoalModal({
  open,
  goal,
  onClose,
  onSuccess,
}: EditSavingGoalModalProps) {
  const { editSavingGoal } = useSavingGoals();

  if (!open || !goal) {
    return null;
  }

  // Setelah pengecekan ini, currentGoal bertipe SavingGoal (bukan null)
  const currentGoal: SavingGoal = goal;

  async function handleSubmit(
    data: Omit<SavingGoal, "id">
  ) {
    try {
      await editSavingGoal(
        currentGoal.id!,
        data
      );

      await onSuccess();

      toast.success(
        "Target tabungan berhasil diperbarui."
      );

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        "Gagal memperbarui target."
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl sm:max-w-xl sm:rounded-2xl sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Edit Target Tabungan
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <SavingGoalForm
          initialData={currentGoal}
          submitText="Update Target"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}