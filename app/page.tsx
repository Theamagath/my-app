"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          router.replace("/dashboard");
        } else {
          router.replace("/login");
        }
      }
    );

    return () => unsubscribe();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="text-center">
        <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

        <h1 className="text-2xl font-bold text-slate-800">
          Yosua Finance
        </h1>

        <p className="mt-2 text-slate-500">
          Memuat aplikasi...
        </p>
      </div>
    </main>
  );
}