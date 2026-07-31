"use client";

import Link from "next/link";
import {
  PlusCircle,
  Tags,
  Wallet,
  ReceiptText,
} from "lucide-react";

const actions = [
  {
    title: "Tambah Transaksi",
    href: "/dashboard/transaksi",
    icon: PlusCircle,
    color: "bg-blue-500",
  },
  {
    title: "Kelola Kategori",
    href: "/dashboard/kategori",
    icon: Tags,
    color: "bg-green-500",
  },
  {
    title: "Kelola Budget",
    href: "/dashboard/budget",
    icon: Wallet,
    color: "bg-yellow-500",
  },
  {
    title: "Lihat Transaksi",
    href: "/dashboard/transaksi",
    icon: ReceiptText,
    color: "bg-purple-500",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Aksi Cepat
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-xl border p-4 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${action.color} text-white`}
              >
                <Icon size={24} />
              </div>

              <h3 className="font-semibold">
                {action.title}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Buka menu
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}