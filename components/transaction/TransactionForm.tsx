"use client";

import { useMemo, useState, type FormEvent } from "react";

import {
  CalendarDays,
  Landmark,
  LoaderCircle,
  Save,
  Wallet,
} from "lucide-react";

import { toast } from "sonner";

import { useCategories } from "@/hooks/useCategories";

import type {
  Transaction,
  TransactionAccount,
  TransactionInput,
  TransactionType,
} from "@/types/transaction";

interface TransactionFormProps {
  initialData?: Transaction;

  onSubmit: (data: TransactionInput) => Promise<void>;

  submitText: string;
}

function getLocalDateInputValue() {
  const date = new Date();

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatAmountInput(value: string) {
  const digitsOnly = value.replace(/\D/g, "");

  if (!digitsOnly) {
    return "";
  }

  return new Intl.NumberFormat("id-ID").format(Number(digitsOnly));
}

function parseAmountInput(value: string) {
  const digitsOnly = value.replace(/\D/g, "");

  return digitsOnly ? Number(digitsOnly) : 0;
}

function formatReadableDate(value: string) {
  if (!value) {
    return "";
  }

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return "";
  }

  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function TransactionForm({
  initialData,
  onSubmit,
  submitText,
}: TransactionFormProps) {
  const {
    categories,
    loading: categoriesLoading,
  } = useCategories();

  const [title, setTitle] = useState(() => initialData?.title ?? "");

  const [amountInput, setAmountInput] = useState(() => {
    if (!initialData) {
      return "";
    }

    return formatAmountInput(String(initialData.amount));
  });

  const [type, setType] = useState<TransactionType>(
    () => initialData?.type ?? "income",
  );

  /*
   * Transaksi lama yang belum memiliki
   * account otomatis dianggap Rekening.
   */
  const [account, setAccount] = useState<TransactionAccount>(
    () => initialData?.account ?? "bank",
  );

  const [category, setCategory] = useState(() => initialData?.category ?? "");

  const [date, setDate] = useState(
    () => initialData?.date || getLocalDateInputValue(),
  );

  const [submitting, setSubmitting] = useState(false);

  const initialCategory =
    initialData?.type === type ? initialData.category.trim() : "";

  const filteredCategories = useMemo(() => {
    const matchingCategories = categories.filter((item) => item.type === type);

    const categoryStillExists =
      initialCategory &&
      matchingCategories.some((item) => item.name.trim() === initialCategory);

    if (!initialCategory || categoryStillExists) {
      return matchingCategories;
    }

    /*
     * Kategori lama tetap ditampilkan
     * saat transaksi diedit meskipun
     * kategorinya sudah dihapus.
     */
    return [
      {
        id: `legacy-${type}-${initialCategory}`,
        name: initialCategory,
        icon: "📁",
        color: "#64748B",
        type,
      },
      ...matchingCategories,
    ];
  }, [categories, initialCategory, type]);

  const readableDate = formatReadableDate(date);

  function handleTypeChange(newType: TransactionType) {
    if (newType === type) {
      return;
    }

    setType(newType);
    setCategory("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting) {
      return;
    }

    const normalizedTitle = title.trim();

    const normalizedCategory = category.trim();

    const amount = parseAmountInput(amountInput);

    if (!normalizedTitle) {
      toast.error("Judul transaksi wajib diisi.");
      return;
    }

    if (normalizedTitle.length < 2) {
      toast.error("Judul transaksi minimal 2 karakter.");
      return;
    }

    if (normalizedTitle.length > 100) {
      toast.error("Judul transaksi maksimal 100 karakter.");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error("Nominal transaksi harus lebih dari Rp0.");
      return;
    }

    if (!normalizedCategory) {
      toast.error("Pilih kategori transaksi.");
      return;
    }

    if (!date) {
      toast.error("Tanggal transaksi wajib dipilih.");
      return;
    }

    setSubmitting(true);

    try {
      await onSubmit({
        title: normalizedTitle,
        amount,
        type,
        account,
        category: normalizedCategory,
        date,
      });
    } catch (error: unknown) {
      console.error("SUBMIT_TRANSACTION_ERROR:", error);

      toast.error(
        error instanceof Error ? error.message : "Transaksi gagal disimpan.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Judul */}
      <div>
        <label
          htmlFor="transaction-title"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Judul Transaksi
        </label>

        <input
          id="transaction-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Contoh: Gaji bulanan"
          disabled={submitting}
          autoComplete="off"
          maxLength={100}
          className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
        />

        <p className="mt-2 text-right text-xs text-slate-400">
          {title.length}/100
        </p>
      </div>

      {/* Nominal */}
      <div>
        <label
          htmlFor="transaction-amount"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Nominal
        </label>

        <div className="flex h-12 items-center overflow-hidden rounded-xl border border-slate-300 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
          <span className="flex h-full items-center border-r border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-600">
            Rp
          </span>

          <input
            id="transaction-amount"
            type="text"
            inputMode="numeric"
            value={amountInput}
            onChange={(event) =>
              setAmountInput(formatAmountInput(event.target.value))
            }
            placeholder="100.000"
            disabled={submitting}
            autoComplete="off"
            className="h-full min-w-0 flex-1 bg-transparent px-4 text-sm font-semibold text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100"
          />
        </div>

        <p className="mt-2 text-xs text-slate-500">
          Masukkan angka tanpa menuliskan simbol rupiah.
        </p>
      </div>

      {/* Jenis transaksi */}
      <fieldset>
        <legend className="mb-2 block text-sm font-semibold text-slate-700">
          Jenis Transaksi
        </legend>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={submitting}
            onClick={() => handleTypeChange("income")}
            className={`h-12 rounded-xl border text-sm font-semibold transition ${
              type === "income"
                ? "border-emerald-600 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-100"
                : "border-slate-300 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            Pemasukan
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={() => handleTypeChange("expense")}
            className={`h-12 rounded-xl border text-sm font-semibold transition ${
              type === "expense"
                ? "border-rose-600 bg-rose-50 text-rose-700 ring-2 ring-rose-100"
                : "border-slate-300 bg-white text-slate-600 hover:border-rose-300 hover:bg-rose-50"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            Pengeluaran
          </button>
        </div>
      </fieldset>

      {/* Sumber dana */}
      <fieldset>
        <legend className="mb-2 block text-sm font-semibold text-slate-700">
          Sumber Dana
        </legend>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={submitting}
            onClick={() => setAccount("bank")}
            className={`flex min-h-20 items-center gap-3 rounded-xl border p-3 text-left transition ${
              account === "bank"
                ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100"
                : "border-slate-300 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                account === "bank"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <Landmark size={20} aria-hidden="true" />
            </div>

            <div>
              <p className="text-sm font-semibold">Rekening</p>

              <p className="mt-1 text-xs opacity-75">Saldo di bank</p>
            </div>
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={() => setAccount("wallet")}
            className={`flex min-h-20 items-center gap-3 rounded-xl border p-3 text-left transition ${
              account === "wallet"
                ? "border-violet-600 bg-violet-50 text-violet-700 ring-2 ring-violet-100"
                : "border-slate-300 bg-white text-slate-600 hover:border-violet-300 hover:bg-violet-50"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                account === "wallet"
                  ? "bg-violet-600 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <Wallet size={20} aria-hidden="true" />
            </div>

            <div>
              <p className="text-sm font-semibold">Dompet</p>

              <p className="mt-1 text-xs opacity-75">Uang tunai</p>
            </div>
          </button>
        </div>

        <p className="mt-2 text-xs text-slate-500">
          Pilih tempat uang masuk atau tempat uang dikeluarkan.
        </p>
      </fieldset>

      {/* Kategori */}
      <div>
        <label
          htmlFor="transaction-category"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Kategori
        </label>

        <select
          id="transaction-category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          disabled={submitting || categoriesLoading}
          className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
        >
          <option value="">
            {categoriesLoading ? "Memuat kategori..." : "Pilih kategori"}
          </option>

          {filteredCategories.map((item, index) => (
            <option
              key={
                item.id
                  ? `${item.id}-${index}`
                  : `${item.type}-${item.name}-${index}`
              }
              value={item.name}
            >
              {item.icon ? `${item.icon} ` : ""}

              {item.name}
            </option>
          ))}
        </select>

        {!categoriesLoading &&
          filteredCategories.length === 0 && (
            <p className="mt-2 text-xs text-amber-600">
              Belum ada kategori untuk jenis transaksi ini. Buat kategori
              terlebih dahulu.
            </p>
          )}
      </div>

      {/* Tanggal */}
      <div>
        <label
          htmlFor="transaction-date"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Tanggal
        </label>

        <div className="relative">
          <CalendarDays
            size={19}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="transaction-date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            disabled={submitting}
            className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          />
        </div>

        {readableDate && (
          <p className="mt-2 text-xs text-slate-500">
            Tanggal dipilih:{" "}
            <span className="font-medium text-slate-700">{readableDate}</span>
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={
          submitting || categoriesLoading || filteredCategories.length === 0
        }
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
      >
        {submitting ? (
          <LoaderCircle size={19} className="animate-spin" aria-hidden="true" />
        ) : (
          <Save size={19} aria-hidden="true" />
        )}

        {submitting ? "Menyimpan..." : submitText}
      </button>
    </form>
  );
}
