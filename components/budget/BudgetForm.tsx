"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useCategories } from "@/hooks/useCategories";
import type { Budget } from "@/types/budget";

interface BudgetFormProps {
  initialData?: Budget;
  onSubmit: (
    data: Omit<Budget, "id">
  ) => Promise<void>;
  submitText: string;
}

export default function BudgetForm({
  initialData,
  onSubmit,
  submitText,
}: BudgetFormProps) {
  const { categories } = useCategories();

  const [categoryId, setCategoryId] = useState("");
  const [dailyAmount, setDailyAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [month, setMonth] = useState(
    new Date().getMonth() + 1
  );
  const [year, setYear] = useState(
    new Date().getFullYear()
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setCategoryId(initialData.categoryId);
      setDailyAmount(initialData.dailyAmount ?? 0);
      setAmount(initialData.amount);
      setMonth(initialData.month);
      setYear(initialData.year);
    } else {
      setCategoryId("");
      setDailyAmount(0);
      setAmount(0);
      setMonth(new Date().getMonth() + 1);
      setYear(new Date().getFullYear());
    }
  }, [initialData]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      !categoryId ||
      dailyAmount <= 0 ||
      amount <= 0
    ) {
      toast.error(
        "Mohon lengkapi seluruh data."
      );
      return;
    }

    const selectedCategory = categories.find(
      (item) => item.id === categoryId
    );

    if (!selectedCategory) {
      toast.error(
        "Kategori tidak ditemukan."
      );
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        categoryId,
        categoryName: selectedCategory.name,

        dailyAmount,

        amount,

        month,
        year,

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
        <label className="mb-2 block font-medium">
          Kategori
        </label>

        <select
          value={categoryId}
          onChange={(e) =>
            setCategoryId(e.target.value)
          }
          className="w-full rounded-lg border px-4 py-2"
        >
          <option value="">
            Pilih Kategori
          </option>

          {categories
            .filter(
              (item) =>
                item.type === "expense"
            )
            .map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.icon} {item.name}
              </option>
            ))}
        </select>
      </div>

      {/* Budget Harian */}
      <div>
        <label className="mb-2 block font-medium">
          Budget Harian
        </label>

        <input
          type="number"
          value={dailyAmount}
          onChange={(e) =>
            setDailyAmount(
              Number(e.target.value)
            )
          }
          className="w-full rounded-lg border px-4 py-2"
          placeholder="25000"
        />
      </div>

      {/* Budget Bulanan */}
      <div>
        <label className="mb-2 block font-medium">
          Budget Bulanan
        </label>

        <input
          type="number"
          value={amount}
          onChange={(e) =>
            setAmount(Number(e.target.value))
          }
          className="w-full rounded-lg border px-4 py-2"
          placeholder="750000"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Bulan
        </label>

        <select
          value={month}
          onChange={(e) =>
            setMonth(Number(e.target.value))
          }
          className="w-full rounded-lg border px-4 py-2"
        >
          {[
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
          ].map((name, index) => (
            <option
              key={index}
              value={index + 1}
            >
              {name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Tahun
        </label>

        <input
          type="number"
          value={year}
          onChange={(e) =>
            setYear(Number(e.target.value))
          }
          className="w-full rounded-lg border px-4 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading
          ? "Menyimpan..."
          : submitText}
      </button>
    </form>
  );
}