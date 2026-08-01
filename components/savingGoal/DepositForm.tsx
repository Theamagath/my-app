"use client";

import { useEffect, useState } from "react";

import type { SavingDeposit } from "@/types/savingDeposit";

interface DepositFormProps {
  initialData?: SavingDeposit;

  submitText: string;

  onSubmit: (
    data: Omit<SavingDeposit, "id">
  ) => Promise<void>;
}

export default function DepositForm({
  initialData,
  submitText,
  onSubmit,
}: DepositFormProps) {
  const [amount, setAmount] =
    useState(0);

  const [date, setDate] =
    useState("");

  const [notes, setNotes] =
    useState("");

  useEffect(() => {
    if (initialData) {
      setAmount(initialData.amount);
      setDate(initialData.date);
      setNotes(initialData.notes ?? "");
    } else {
      setDate(
        new Date()
          .toISOString()
          .split("T")[0]
      );
    }
  }, [initialData]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (amount <= 0) return;

    await onSubmit({
      goalId:
        initialData?.goalId ?? "",
      amount,
      date,
      notes,
      createdAt:
        initialData?.createdAt ??
        new Date().toISOString(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block font-medium">
          Nominal Setoran
        </label>

        <input
          type="number"
          value={amount}
          onChange={(e) =>
            setAmount(
              Number(e.target.value)
            )
          }
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Tanggal
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Catatan
        </label>

        <textarea
          rows={3}
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
      >
        {submitText}
      </button>
    </form>
  );
}