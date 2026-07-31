"use client";

import { useState } from "react";
import { toast } from "sonner";

import AddSavingGoalModal from "@/components/savingGoal/AddSavingGoalModal";
import AddDepositModal from "@/components/savingGoal/AddDepositModal";
import SavingGoalCard from "@/components/savingGoal/SavingGoalCard";

import { useSavingGoals } from "@/hooks/useSavingGoals";
import { useSavingDeposits } from "@/hooks/useSavingDeposits";

import type { SavingGoal } from "@/types/savingGoal";

function SavingGoalItem({
  goal,
  onDeposit,
  onDelete,
}: {
  goal: SavingGoal;
  onDeposit: (goal: SavingGoal) => void;
  onDelete: (goal: SavingGoal) => void;
}) {
  const { deposits } = useSavingDeposits(goal.id ?? "");

  return (
    <SavingGoalCard
      goal={goal}
      deposits={deposits}
      onDeposit={onDeposit}
      onDelete={onDelete}
    />
  );
}

export default function TargetTabunganPage() {
  const {
    savingGoals,
    loading,
    reload,
    removeSavingGoal,
  } = useSavingGoals();

  const [openAdd, setOpenAdd] =
    useState(false);

  const [openDeposit, setOpenDeposit] =
    useState(false);

  const [selectedGoal, setSelectedGoal] =
    useState<SavingGoal | null>(null);

  async function handleDelete(
    goal: SavingGoal
  ) {
    if (!goal.id) return;

    if (
      !window.confirm(
        `Hapus target "${goal.name}"?`
      )
    )
      return;

    await removeSavingGoal(goal.id);

    toast.success(
      "Target berhasil dihapus."
    );
  }

  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        Memuat target tabungan...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Target Tabungan
            </h1>

            <p className="text-gray-500">
              Kelola target keuanganmu.
            </p>
          </div>

          <button
            onClick={() =>
              setOpenAdd(true)
            }
            className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            + Tambah Target
          </button>
        </div>

        {savingGoals.length === 0 ? (
          <div className="rounded-2xl border bg-white p-10 text-center">
            <h2 className="text-xl font-semibold">
              Belum Ada Target
            </h2>

            <p className="mt-2 text-gray-500">
              Tambahkan target tabungan
              pertamamu.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {savingGoals.map((goal) => (
              <SavingGoalItem
                key={goal.id}
                goal={goal}
                onDeposit={(goal) => {
                  setSelectedGoal(goal);
                  setOpenDeposit(true);
                }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <AddSavingGoalModal
        open={openAdd}
        onClose={() =>
          setOpenAdd(false)
        }
        onSuccess={reload}
      />

      <AddDepositModal
        open={openDeposit}
        goal={selectedGoal}
        onClose={() => {
          setOpenDeposit(false);
          setSelectedGoal(null);
        }}
        onSuccess={reload}
      />
    </>
  );
}