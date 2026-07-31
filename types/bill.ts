export interface Bill {
  id?: string;

  // Nama tagihan
  name: string;

  // Nominal
  amount: number;

  // Kategori
  category: string;

  // Tanggal jatuh tempo (1-31)
  dueDate: number;

  // Pengulangan
  repeat: "monthly" | "yearly";

  // Status
  status: "active" | "paid";

  // Catatan
  notes?: string;

  createdAt?: string;
}