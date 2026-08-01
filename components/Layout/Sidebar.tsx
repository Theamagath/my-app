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
  Handshake,
  PiggyBank,
  Receipt,
  X,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

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
    name: "Tagihan",
    href: "/dashboard/tagihan",
    icon: Receipt,
  },
  {
    name: "Target Tabungan",
    href: "/dashboard/tabungan",
    icon: PiggyBank,
  },
  {
    name: "Utang & Piutang",
    href: "/dashboard/utang-piutang",
    icon: Handshake,
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

export default function Sidebar({
  open,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay Mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-64 flex-col
          bg-slate-900 text-white transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <h1 className="text-2xl font-bold">
            Yosua
            <span className="text-blue-400">
              Finance
            </span>
          </h1>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-800 lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
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
                onClick={onClose}
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

        {/* Footer */}
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
    </>
  );
}