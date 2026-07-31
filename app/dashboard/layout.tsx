import Sidebar from "@/components/Layout/Sidebar";
import Navbar from "@/components/Layout/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <main className="ml-64 min-h-screen">
        <Navbar />

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}