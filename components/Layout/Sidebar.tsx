"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ReceiptText,
  Tags,
  Wallet,
  FileText,
  Settings,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Transaksi",
    href: "/dashboard/transaksi",
    icon: ReceiptText,
  },
  {
    name: "Kategori",
    href: "/dashboard/kategori",
    icon: Tags,
  },
  {
    name: "Budget",
    href: "/dashboard/budget",
    icon: Wallet,
  },
  {
    name: "Laporan",
    href: "/dashboard/laporan",
    icon: FileText,
  },
  {
    name: "Pengaturan",
    href: "/dashboard/pengaturan",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-slate-900 text-white">
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold">
          Yosua
          <span className="text-blue-400">
            Finance
          </span>
        </h1>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menus.map((menu) => {
          const Icon = menu.icon;

          const active =
         menu.href === "/dashboard"
         ? pathname === "/dashboard"
         : pathname === menu.href ||
           pathname.startsWith(menu.href + "/");

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{menu.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
            Y
          </div>

          <div>
            <p className="font-semibold">
              Yosua
            </p>

            <p className="text-xs text-slate-400">
              Personal Finance
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}