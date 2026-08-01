"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Wallet, Lock, Mail } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      toast.success("Login berhasil!");

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(
        error.message || "Login gagal."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-6">

      <div className="w-full max-w-md rounded-3xl bg-white/95 p-8 shadow-2xl backdrop-blur">

        <div className="mb-8 text-center">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
            <Wallet size={38} />
          </div>

          <h1 className="text-3xl font-bold">
            Yosua
            <span className="text-blue-600">
              Finance
            </span>
          </h1>

          <p className="mt-2 text-gray-500">
            Kelola keuanganmu dengan lebih mudah.
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block font-medium">
              Email
            </label>

            <div className="flex items-center rounded-xl border px-4">

              <Mail
                size={18}
                className="text-gray-400"
              />

              <input
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full bg-transparent px-3 py-3 outline-none"
                required
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Password
            </label>

            <div className="flex items-center rounded-xl border px-4">

              <Lock
                size={18}
                className="text-gray-400"
              />

              <input
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-transparent px-3 py-3 outline-none"
                required
              />

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading
              ? "Sedang Login..."
              : "Login"}
          </button>

        </form>

        <div className="mt-8 border-t pt-5 text-center">

          <p className="text-sm text-gray-500">
            © 2026 Yosua Finance
          </p>

        </div>

      </div>

    </main>
  );
}