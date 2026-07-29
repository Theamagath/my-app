import StatCard from "@/components/dashboard/StatCard";

export default function DashboardPage() {
  return (
    <div>

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p className="text-gray-500 mb-8">
        Ringkasan keuangan hari ini.
      </p>

      <div className="grid grid-cols-3 gap-6">

        <StatCard
          title="Saldo"
          amount="Rp 0"
          color="text-blue-600"
        />

        <StatCard
          title="Pemasukan"
          amount="Rp 0"
          color="text-green-600"
        />

        <StatCard
          title="Pengeluaran"
          amount="Rp 0"
          color="text-red-600"
        />

      </div>

    </div>
  );
}