"use client";

import { useEffect, useState } from "react";

import type { Debt } from "@/types/debt";

interface DebtFormProps {
  initialData?: Debt;

  submitText: string;

  onSubmit: (
    data: Omit<Debt, "id">
  ) => Promise<void>;
}

export default function DebtForm({
  initialData,
  submitText,
  onSubmit,
}: DebtFormProps) {
  const [type, setType] = useState<
    "debt" | "receivable"
  >("debt");

  const [person, setPerson] =
    useState("");

  const [amount, setAmount] =
    useState(0);

  const [dueDate, setDueDate] =
    useState("");

  const [notes, setNotes] =
    useState("");

  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setPerson(initialData.person);
      setAmount(initialData.amount);
      setDueDate(initialData.dueDate);
      setNotes(initialData.notes ?? "");
    } else {
      setDueDate(
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

    if (
      person.trim() === "" ||
      amount <= 0
    ) {
      return;
    }

    await onSubmit({
      type,
      person,
      amount,
      remainingAmount: initialData
        ? initialData.remainingAmount
        : amount,
      dueDate,
      notes,
      status: initialData
        ? initialData.status
        : "unpaid",
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
          Jenis
        </label>

        <select
          value={type}
          onChange={(e) =>
            setType(
              e.target.value as
                | "debt"
                | "receivable"
            )
          }
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="debt">
            Utang
          </option>

          <option value="receivable">
            Piutang
          </option>
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Nama Orang
        </label>

        <input
          value={person}
          onChange={(e) =>
            setPerson(e.target.value)
          }
          className="w-full rounded-xl border px-4 py-3"
          placeholder="Contoh: Andi"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Nominal
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
          Jatuh Tempo
        </label>

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
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
            setNotes(e.target.value)
          }
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        {submitText}
      </button>
    </form>
  );
}