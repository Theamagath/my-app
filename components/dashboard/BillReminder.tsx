"use client";

import type { Bill } from "@/types/bill";

interface BillReminderProps {
  bills: Bill[];
}

export default function BillReminder({
  bills,
}: BillReminderProps) {
  const today = new Date().getDate();

  const upcomingBills = bills.filter((bill) => {
    if (bill.status !== "active") return false;

    const diff = bill.dueDate - today;

    return diff >= 0 && diff <= 3;
  });

  if (upcomingBills.length === 0) return null;

  return (
    <div className="rounded-2xl border border-yellow-300 bg-yellow-50 p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-yellow-700">
        ⚠️ Tagihan Mendekati Jatuh Tempo
      </h2>

      <div className="space-y-4">
        {upcomingBills.map((bill) => {
          const remaining =
            bill.dueDate - today;

          return (
            <div
              key={bill.id}
              className="rounded-xl bg-white p-4 shadow"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">
                    {bill.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {bill.category}
                  </p>
                </div>

                <span className="font-bold text-blue-600">
                  Rp{" "}
                  {bill.amount.toLocaleString(
                    "id-ID"
                  )}
                </span>
              </div>

              <p className="mt-3 text-sm">
                📅 Jatuh tempo tanggal{" "}
                <strong>{bill.dueDate}</strong>
              </p>

              <p className="text-sm text-red-600">
                {remaining === 0
                  ? "Hari ini"
                  : `${remaining} hari lagi`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}