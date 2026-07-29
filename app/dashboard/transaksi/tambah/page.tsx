"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addTransaction } from "@/services/transaction.service";

export default function TambahTransaksiPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("Makanan");
  const [date, setDate] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !amount || !date) {
      alert("Lengkapi semua data.");
      return;
    }

    await addTransaction({
      title,
      amount: Number(amount),
      type,
      category,
      date,
    });

    alert("Transaksi berhasil disimpan.");

    router.push("/dashboard/transaksi");
  }

  return (
    <div className="max-w-xl">

      <h1 className="text-3xl font-bold mb-8">
        Tambah Transaksi
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white rounded-2xl p-6 border shadow-sm"
      >

        <input
          placeholder="Judul transaksi"
          className="w-full border rounded-lg p-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Nominal"
          className="w-full border rounded-lg p-3"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="w-full border rounded-lg p-3"
          value={type}
          onChange={(e) =>
            setType(e.target.value as "income" | "expense")
          }
        >
          <option value="income">Pemasukan</option>
          <option value="expense">Pengeluaran</option>
        </select>

        <select
          className="w-full border rounded-lg p-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Makanan</option>
          <option>Transportasi</option>
          <option>Belanja</option>
          <option>Tagihan</option>
          <option>Gaji</option>
          <option>Lainnya</option>
        </select>

        <input
          type="date"
          className="w-full border rounded-lg p-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          Simpan
        </button>

      </form>

    </div>
  );
}