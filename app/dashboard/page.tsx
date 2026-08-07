"use client";

import { useMemo } from "react";
import Link from "next/link";

import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  CircleDollarSign,
  Landmark,
  LoaderCircle,
  Plus,
  ReceiptText,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { auth } from "@/lib/firebase";
import { useBills } from "@/hooks/useBills";
import { useTransactions } from "@/hooks/useTransactions";
import { calculateSummary } from "@/lib/calculate";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: string) {
  if (!date) {
    return "-";
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

export default function DashboardPage() {


  const { transactions, loading: transactionsLoading } = useTransactions();

  const { bills, loading: billsLoading } = useBills();

  const { income, expense } = calculateSummary(transactions);

  /*
   * Menghitung saldo berdasarkan
   * tempat penyimpanan uang.
   *
   * Transaksi lama tanpa account
   * otomatis dianggap Rekening.
   */
  const accountSummary = useMemo(() => {
    return transactions.reduce(
      (summary, transaction) => {
        const account = transaction.account === "wallet" ? "wallet" : "bank";

        const amount = Number(transaction.amount) || 0;

        const signedAmount = transaction.type === "income" ? amount : -amount;

        summary[account] += signedAmount;

        return summary;
      },
      {
        bank: 0,
        wallet: 0,
      },
    );
  }, [transactions]);

  const bankBalance = accountSummary.bank;

  const walletBalance = accountSummary.wallet;

  const totalBalance = bankBalance + walletBalance;

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((first, second) => {
        const firstDate = new Date(`${first.date}T00:00:00`).getTime();

        const secondDate = new Date(`${second.date}T00:00:00`).getTime();

        return secondDate - firstDate;
      })
      .slice(0, 5);
  }, [transactions]);

  const activeBills = useMemo(() => {
    return bills
      .filter((bill) => bill.status === "active")
      .sort((first, second) => first.dueDate - second.dueDate)
      .slice(0, 4);
  }, [bills]);

  const currentUser = auth.currentUser;

  const displayName =
    currentUser?.displayName?.trim() ||
    currentUser?.email?.split("@")[0] ||
    "Pengguna";

  const isLoading = transactionsLoading || billsLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-125 items-center justify-center">
        <div className="text-center">
          <LoaderCircle
            size={42}
            className="mx-auto animate-spin text-blue-600"
            aria-hidden="true"
          />

          <p className="mt-4 text-sm text-slate-500">
            Memuat dashboard keuangan...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl sm:p-8">
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/30 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl"
        />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-300">
              Ringkasan keuangan
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Selamat datang, {displayName}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Pantau uang di rekening, uang tunai di dompet, transaksi, dan
              tagihan dalam satu tempat.
            </p>
          </div>

          <Link
            href="/dashboard/transaksi"
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            <Plus size={18} aria-hidden="true" />
            Tambah Transaksi
          </Link>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {/* Total saldo */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 xl:col-span-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">Total Saldo</p>

              <p
                className={`mt-3 wrap-break-word text-2xl font-bold ${
                  totalBalance >= 0 ? "text-slate-950" : "text-rose-600"
                }`}
              >
                {formatCurrency(totalBalance)}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Rekening ditambah dompet
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
              <CircleDollarSign
                size={22}
                className="text-blue-600"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Saldo rekening */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">
                Uang di Rekening
              </p>

              <p
                className={`mt-3 wrap-break-word text-2xl font-bold ${
                  bankBalance >= 0 ? "text-blue-600" : "text-rose-600"
                }`}
              >
                {formatCurrency(bankBalance)}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Saldo tersimpan di bank
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
              <Landmark
                size={22}
                className="text-blue-600"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Saldo dompet */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">
                Uang di Dompet
              </p>

              <p
                className={`mt-3 wrap-break-word text-2xl font-bold ${
                  walletBalance >= 0 ? "text-violet-600" : "text-rose-600"
                }`}
              >
                {formatCurrency(walletBalance)}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Uang tunai yang tersedia
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100">
              <Wallet
                size={22}
                className="text-violet-600"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Total pemasukan */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">
                Total Pemasukan
              </p>

              <p className="mt-3 wrap-break-word text-2xl font-bold text-emerald-600">
                {formatCurrency(income)}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Seluruh transaksi pemasukan
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
              <TrendingUp
                size={22}
                className="text-emerald-600"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Total pengeluaran */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">
                Total Pengeluaran
              </p>

              <p className="mt-3 wrap-break-word text-2xl font-bold text-rose-600">
                {formatCurrency(expense)}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Seluruh transaksi pengeluaran
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-100">
              <TrendingDown
                size={22}
                className="text-rose-600"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* RECENT TRANSACTIONS */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
            <div>
              <h2 className="font-bold text-slate-900">Transaksi Terbaru</h2>

              <p className="mt-1 text-sm text-slate-500">
                Aktivitas keuangan yang terakhir dicatat.
              </p>
            </div>

            <Link
              href="/dashboard/transaksi"
              className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Lihat semua
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          {recentTransactions.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <ReceiptText
                  size={26}
                  className="text-slate-400"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                Belum ada transaksi
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Tambahkan pemasukan atau pengeluaran pertamamu.
              </p>

              <Link
                href="/dashboard/transaksi"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus size={17} aria-hidden="true" />
                Tambah transaksi
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentTransactions.map((transaction, index) => {
                const isIncome = transaction.type === "income";

                const accountLabel =
                  transaction.account === "wallet" ? "Dompet" : "Rekening";

                return (
                  <div
                    key={
                      transaction.id ??
                      `${transaction.date}-${transaction.title}-${index}`
                    }
                    className="flex items-center gap-4 px-5 py-4 transition hover:bg-slate-50 sm:px-6"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        isIncome ? "bg-emerald-100" : "bg-rose-100"
                      }`}
                    >
                      {isIncome ? (
                        <ArrowUpRight
                          size={20}
                          className="text-emerald-600"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowDownRight
                          size={20}
                          className="text-rose-600"
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {transaction.title}
                      </p>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {transaction.category || "Tanpa kategori"}
                        {" · "}
                        {accountLabel}
                        {" · "}
                        {formatDate(transaction.date)}
                      </p>
                    </div>

                    <p
                      className={`shrink-0 text-sm font-bold ${
                        isIncome ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {isIncome ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ACTIVE BILLS */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-bold text-slate-900">Tagihan Aktif</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Pengingat pembayaran bulan ini.
                </p>
              </div>

              <CalendarClock
                size={21}
                className="text-blue-600"
                aria-hidden="true"
              />
            </div>
          </div>

          {activeBills.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <CircleDollarSign
                size={38}
                className="mx-auto text-slate-300"
                aria-hidden="true"
              />

              <p className="mt-3 text-sm font-medium text-slate-700">
                Tidak ada tagihan aktif
              </p>

              <Link
                href="/dashboard/tagihan"
                className="mt-4 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Kelola tagihan
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {activeBills.map((bill, index) => (
                <div
                  key={bill.id ?? `${bill.name}-${bill.dueDate}-${index}`}
                  className="px-5 py-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {bill.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Jatuh tempo tanggal {bill.dueDate}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-bold text-slate-900">
                      {formatCurrency(bill.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-slate-100 p-4">
            <Link
              href="/dashboard/tagihan"
              className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-slate-100 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Lihat semua tagihan
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">Akses Cepat</h2>

          <p className="mt-1 text-sm text-slate-500">
            Buka fitur yang paling sering digunakan.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Link
            href="/dashboard/transaksi"
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
          >
            <ReceiptText
              size={22}
              className="text-blue-600"
              aria-hidden="true"
            />

            <p className="mt-3 text-sm font-semibold text-slate-900">
              Transaksi
            </p>
          </Link>

          <Link
            href="/dashboard/budget"
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
          >
            <Wallet size={22} className="text-violet-600" aria-hidden="true" />

            <p className="mt-3 text-sm font-semibold text-slate-900">Budget</p>
          </Link>

          <Link
            href="/dashboard/tagihan"
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
          >
            <CalendarClock
              size={22}
              className="text-amber-600"
              aria-hidden="true"
            />

            <p className="mt-3 text-sm font-semibold text-slate-900">Tagihan</p>
          </Link>

          <Link
            href="/dashboard/laporan"
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
          >
            <TrendingUp
              size={22}
              className="text-emerald-600"
              aria-hidden="true"
            />

            <p className="mt-3 text-sm font-semibold text-slate-900">Laporan</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
