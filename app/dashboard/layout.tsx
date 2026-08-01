"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

import FloatingActionButton from "@/components/Layout/FloatingActionButton";
import Sidebar from "@/components/Layout/Sidebar";
import Navbar from "@/components/Layout/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { user, loading } = useAuth();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

          <h2 className="text-xl font-semibold">
            Memuat...
          </h2>

          <p className="mt-2 text-gray-500">
            Mengecek autentikasi...
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <main className="min-h-screen lg:ml-64">
        {/* Header Mobile */}
        <div className="sticky top-0 z-30 flex h-16 items-center border-b bg-white px-4 lg:hidden">
          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <Menu size={24} />
          </button>

          <h1 className="ml-4 text-xl font-bold">
            Yosua
            <span className="text-blue-600">
              Finance
            </span>
          </h1>
        </div>

        <Navbar />

        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>

        <FloatingActionButton />
      </main>
    </div>
  );
}