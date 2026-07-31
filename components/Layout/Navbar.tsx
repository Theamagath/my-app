export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white/80 px-8 backdrop-blur">
      <div>
        <h2 className="text-xl font-bold">
          Selamat Datang 👋
        </h2>

        <p className="text-sm text-gray-500">
          Kelola keuanganmu dengan lebih mudah.
        </p>
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
        Y
      </div>
    </header>
  );
}