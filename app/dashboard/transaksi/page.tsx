import Link from "next/link";

export default function TransaksiPage() {
  return (
    <div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Transaksi</h1>
          <p className="text-gray-500">
            Kelola semua pemasukan dan pengeluaran.
          </p>
        </div>

        <Link
          href="/dashboard/transaksi/tambah"
          className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          + Tambah Transaksi
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-6">

        <h2 className="font-semibold mb-6">
          Belum ada transaksi
        </h2>

        <p className="text-gray-500">
          Tambahkan transaksi pertamamu.
        </p>

      </div>

    </div>
  );
}