"use client";

import type { SavingGoal } from "@/types/savingGoal";
import type { SavingDeposit } from "@/types/savingDeposit";

interface SavingGoalCardProps {
  goal: SavingGoal;
  deposits: SavingDeposit[];

  onDeposit?: (goal: SavingGoal) => void;
  onEdit?: (goal: SavingGoal) => void;
  onDelete?: (goal: SavingGoal) => void;
}

export default function SavingGoalCard({
  goal,
  deposits,
  onDeposit,
  onEdit,
  onDelete,
}: SavingGoalCardProps) {
  const currentAmount = deposits.reduce(
    (total, item) => total + item.amount,
    0
  );

  const percentage =
    goal.targetAmount === 0
      ? 0
      : (currentAmount / goal.targetAmount) * 100;

  const remaining = Math.max(
    goal.targetAmount - currentAmount,
    0
  );

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="text-4xl">
          {goal.icon}
        </div>

        <div>
          <h2 className="text-xl font-bold">
            {goal.name}
          </h2>

          <p className="text-sm text-gray-500">
            Target{" "}
            {new Date(
              goal.targetDate
            ).toLocaleDateString("id-ID")}
          </p>
        </div>
      </div>

      {/* Nominal */}
      <div className="mt-6">
        <div className="flex justify-between text-sm">
          <span>
            Rp{" "}
            {currentAmount.toLocaleString(
              "id-ID"
            )}
          </span>

          <span>
            Rp{" "}
            {goal.targetAmount.toLocaleString(
              "id-ID"
            )}
          </span>
        </div>

        <div className="mt-2 h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${Math.min(
                percentage,
                100
              )}%`,
              backgroundColor:
                goal.color,
            }}
          />
        </div>

        <div className="mt-2 flex justify-between text-sm">
          <span>
            {percentage.toFixed(1)}%
          </span>

          <span className="text-red-500">
            Sisa Rp{" "}
            {remaining.toLocaleString(
              "id-ID"
            )}
          </span>
        </div>
      </div>

      {/* Tombol */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() =>
            onDeposit?.(goal)
          }
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + Setoran
        </button>

        <button
          onClick={() =>
            onEdit?.(goal)
          }
          className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
        >
          Edit
        </button>

        <button
          onClick={() =>
            onDelete?.(goal)
          }
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}