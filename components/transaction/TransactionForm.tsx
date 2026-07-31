"use client";

import { useEffect, useState } from "react";

import { useCategories } from "@/hooks/useCategories";
import type { Transaction } from "@/types/transaction";

interface TransactionFormProps {
  initialData?: Transaction;
  onSubmit: (
    data: Omit<Transaction, "id" | "createdAt">
  ) => Promise<void>;
  submitText: string;
}

export default function TransactionForm({
  initialData,
  onSubmit,
  submitText,
}: TransactionFormProps) {
  const { categories } = useCategories();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAmount(initialData.amount);
      setType(initialData.type);
      setCategory(initialData.category);
      setDate(initialData.date);
    } else {
      setTitle("");
      setAmount(0);
      setType("income");
      setCategory("");
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, [initialData]);

  useEffect(() => {
    setCategory("");
  }, [type]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !title.trim() ||
      amount <= 0 ||
      !category.trim() ||
      !date
    ) {
      alert("Mohon lengkapi seluruh data.");
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        title,
        amount,
        type,
        category,
        date,
      });
    } finally {
      setLoading(false);
    }
  }

  const filteredCategories = categories.filter(
    (item) => item.type === type
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="block mb-2 font-medium">
          Judul
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border px-4 py-2"
          placeholder="Contoh: Gaji Bulanan"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Nominal
        </label>

        <input
          type="number"
          value={amount}
          onChange={(e) =>
            setAmount(Number(e.target.value))
          }
          className="w-full rounded-lg border px-4 py-2"
          placeholder="100000"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Jenis
        </label>

        <select
          value={type}
          onChange={(e) =>
            setType(
              e.target.value as "income" | "expense"
            )
          }
          className="w-full rounded-lg border px-4 py-2"
        >
          <option value="income">
            Pemasukan
          </option>

          <option value="expense">
            Pengeluaran
          </option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Kategori
        </label>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full rounded-lg border px-4 py-2"
        >
          <option value="">
            Pilih Kategori
          </option>

          {filteredCategories.map((item) => (
            <option
              key={item.id}
              value={item.name}
            >
              {item.icon} {item.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Tanggal
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
          className="w-full rounded-lg border px-4 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading
          ? "Menyimpan..."
          : submitText}
      </button>
    </form>
  );
}