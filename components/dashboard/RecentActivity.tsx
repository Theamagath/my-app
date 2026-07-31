"use client";

import type { Transaction } from "@/types/transaction";

interface RecentActivityProps {
  transactions: Transaction[];
}

export default function RecentActivity({
  transactions,
}: RecentActivityProps) {
  const recent = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 5);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Aktivitas Terbaru
      </h2>

      {recent.length === 0 ? (
        <p className="text-gray-500">
          Belum ada transaksi.
        </p>
      ) : (
        <div className="space-y-5">
          {recent.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4 last:border-none"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    item.type === "income"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {item.type === "income"
                    ? "💰"
                    : "💸"}
                </div>

                <div>
                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.category}
                  </p>

                  <p className="text-xs text-gray-400">
                    {new Date(
                      item.date
                    ).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>

              <span
                className={`font-bold ${
                  item.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {item.type === "income"
                  ? "+"
                  : "-"}
                Rp{" "}
                {item.amount.toLocaleString(
                  "id-ID"
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}