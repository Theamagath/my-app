"use client";

import { useEffect, useState } from "react";
import type { SavingGoal } from "@/types/savingGoal";

interface SavingGoalFormProps {
  initialData?: SavingGoal;
  submitText: string;
  onSubmit: (
    data: Omit<SavingGoal, "id">
  ) => Promise<void>;
}

export default function SavingGoalForm({
  initialData,
  submitText,
  onSubmit,
}: SavingGoalFormProps) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] =
    useState(0);
  const [targetDate, setTargetDate] =
    useState("");
  const [icon, setIcon] =
    useState("🎯");
  const [color, setColor] =
    useState("#2563EB");
  const [notes, setNotes] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!initialData) return;

    setName(initialData.name);
    setTargetAmount(
      initialData.targetAmount
    );
    setTargetDate(
      initialData.targetDate
    );
    setIcon(initialData.icon);
    setColor(initialData.color);
    setNotes(initialData.notes ?? "");
  }, [initialData]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      await onSubmit({
        name,
        targetAmount,

        currentAmount:
          initialData?.currentAmount ??
          0,

        targetDate,

        icon,
        color,
        notes,

        status:
          initialData?.status ??
          "active",

        createdAt:
          initialData?.createdAt ??
          new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label>Nama Target</label>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="mt-2 w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label>Target Nominal</label>

        <input
          type="number"
          value={targetAmount}
          onChange={(e) =>
            setTargetAmount(
              Number(e.target.value)
            )
          }
          className="mt-2 w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label>Target Selesai</label>

        <input
          type="date"
          value={targetDate}
          onChange={(e) =>
            setTargetDate(
              e.target.value
            )
          }
          className="mt-2 w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label>Emoji</label>

        <input
          value={icon}
          onChange={(e) =>
            setIcon(e.target.value)
          }
          className="mt-2 w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label>Warna Progress</label>

        <input
          type="color"
          value={color}
          onChange={(e) =>
            setColor(e.target.value)
          }
          className="mt-2 h-12 w-full rounded-xl border"
        />
      </div>

      <div>
        <label>Catatan</label>

        <textarea
          rows={3}
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          className="mt-2 w-full rounded-xl border px-4 py-3"
        />
      </div>

      <button
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white"
      >
        {loading
          ? "Menyimpan..."
          : submitText}
      </button>
    </form>
  );
}