"use client";

import Link from "next/link";

import { useSavingGoals } from "@/hooks/useSavingGoals";
import { useSavingDeposits } from "@/hooks/useSavingDeposits";

function GoalItem({
  goalId,
  name,
  icon,
  targetAmount,
}: {
  goalId: string;
  name: string;
  icon: string;
  targetAmount: number;
}) {
  const { deposits } =
    useSavingDeposits(goalId);

  const current = deposits.reduce(
    (total, item) => total + item.amount,
    0
  );

  const percentage =
    targetAmount === 0
      ? 0
      : Math.min(
          (current / targetAmount) * 100,
          100
        );

  return (
    <div className="rounded-xl border p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">
            {icon}
          </span>

          <span className="font-semibold">
            {name}
          </span>
        </div>

        <span className="text-sm font-semibold text-blue-600">
          {percentage.toFixed(0)}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="mt-2 flex justify-between text-sm">
        <span>
          Rp {current.toLocaleString("id-ID")}
        </span>

        <span>
          Rp{" "}
          {targetAmount.toLocaleString(
            "id-ID"
          )}
        </span>
      </div>
    </div>
  );
}

export default function SavingGoalWidget() {
  const {
    savingGoals,
    loading,
  } = useSavingGoals();

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        Memuat...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          🎯 Target Tabungan
        </h2>

        <Link
          href="/dashboard/tabungan"
          className="text-sm font-semibold text-blue-600"
        >
          Lihat Semua
        </Link>
      </div>

      {savingGoals.length === 0 ? (
        <p className="text-gray-500">
          Belum ada target tabungan.
        </p>
      ) : (
        <div className="space-y-4">
          {savingGoals
            .slice(0, 3)
            .map((goal) => (
              <GoalItem
                key={goal.id}
                goalId={goal.id!}
                name={goal.name}
                icon={goal.icon}
                targetAmount={
                  goal.targetAmount
                }
              />
            ))}
        </div>
      )}
    </div>
  );
}