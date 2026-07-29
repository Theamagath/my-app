export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8">
      <div>
        <h2 className="font-bold text-xl">
          Selamat Datang 👋
        </h2>

        <p className="text-gray-500 text-sm">
          Kelola keuanganmu dengan lebih mudah.
        </p>
      </div>

      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
        Y
      </div>
    </header>
  );
}