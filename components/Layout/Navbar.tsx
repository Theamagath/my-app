"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { LogOut, ChevronDown } from "lucide-react";

import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/transaksi": "Transaksi",
  "/dashboard/transaksi/tambah": "Tambah Transaksi",
  "/dashboard/kategori": "Kategori",
  "/dashboard/budget": "Budget",
  "/dashboard/tagihan": "Tagihan",
  "/dashboard/tabungan": "Target Tabungan",
  "/dashboard/utang-piutang": "Utang & Piutang",
  "/dashboard/laporan": "Laporan",
  "/dashboard/pengaturan": "Pengaturan",
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const title = pageTitles[pathname] ?? "Dashboard";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  async function handleLogout() {
    const confirmLogout = window.confirm(
      "Yakin ingin logout?"
    );

    if (!confirmLogout) return;

    await signOut(auth);

    router.replace("/login");
  }

  const email =
    user?.email ?? "Tidak diketahui";

  const initial =
    email.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-20 hidden h-16 items-center justify-between border-b border-gray-200 bg-white/90 px-8 backdrop-blur lg:flex">
      <h2 className="text-2xl font-bold text-slate-800">
        {title}
      </h2>

      <div
        className="relative"
        ref={menuRef}
      >
        <button
          onClick={() =>
            setOpen(!open)
          }
          className="flex items-center gap-3 rounded-xl border px-3 py-2 transition hover:bg-gray-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
            {initial}
          </div>

          <div className="text-left">
            <p className="text-sm font-semibold">
              {email}
            </p>
          </div>

          <ChevronDown size={18} />
        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border bg-white shadow-xl">

            <div className="border-b p-4">
              <p className="font-semibold">
                {email}
              </p>

              <p className="text-xs text-gray-500">
                Login Firebase
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-3 text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={18} />

              Logout
            </button>

          </div>
        )}
      </div>
    </header>
  );
}