"use client";

import { useEffect, useState } from "react";

import type { Bill } from "@/types/bill";

interface BillFormProps {
  initialData?: Bill;

  onSubmit: (
    data: Omit<Bill, "id">
  ) => Promise<void>;

  submitText: string;
}

export default function BillForm({
  initialData,
  onSubmit,
  submitText,
}: BillFormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] =
    useState("");
  const [dueDate, setDueDate] =
    useState(1);

  const [repeat, setRepeat] =
    useState<"monthly" | "yearly">(
      "monthly"
    );

  const [notes, setNotes] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!initialData) return;

    setName(initialData.name);
    setAmount(initialData.amount);
    setCategory(initialData.category);
    setDueDate(initialData.dueDate);
    setRepeat(initialData.repeat);
    setNotes(initialData.notes ?? "");
  }, [initialData]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      !name ||
      !amount ||
      !category
    ) {
      alert(
        "Mohon lengkapi seluruh data."
      );

      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        name,
        amount,
        category,
        dueDate,
        repeat,
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
      {/* Nama */}
      <div>
        <label className="mb-2 block font-medium">
          Nama Tagihan
        </label>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full rounded-xl border px-4 py-3"
          placeholder="Netflix"
        />
      </div>

      {/* Nominal */}
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
          placeholder="65000"
        />
      </div>

      {/* Kategori */}
      <div>
        <label className="mb-2 block font-medium">
          Kategori
        </label>

        <input
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="w-full rounded-xl border px-4 py-3"
          placeholder="Hiburan"
        />
      </div>

      {/* Tanggal */}
      <div>
        <label className="mb-2 block font-medium">
          Tanggal Jatuh Tempo
        </label>

        <input
          type="number"
          min={1}
          max={31}
          value={dueDate}
          onChange={(e) =>
            setDueDate(
              Number(e.target.value)
            )
          }
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      {/* Repeat */}
      <div>
        <label className="mb-2 block font-medium">
          Pengulangan
        </label>

        <select
          value={repeat}
          onChange={(e) =>
            setRepeat(
              e.target.value as
                | "monthly"
                | "yearly"
            )
          }
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="monthly">
            Bulanan
          </option>

          <option value="yearly">
            Tahunan
          </option>
        </select>
      </div>

      {/* Catatan */}
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
          placeholder="Opsional"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading
          ? "Menyimpan..."
          : submitText}
      </button>
    </form>
  );
}