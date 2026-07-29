"use client";

import Link from "next/link";

const menus = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Transaksi", href: "/dashboard/transaksi" },
  { name: "Budget", href: "/dashboard/budget" },
  { name: "Laporan", href: "/dashboard/laporan" },
  { name: "Pengaturan", href: "/dashboard/pengaturan" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">
        Yosua<span className="text-blue-400">Finance</span>
      </h1>

      <nav className="space-y-2">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className="block rounded-lg px-4 py-3 hover:bg-slate-800 transition"
          >
            {menu.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}