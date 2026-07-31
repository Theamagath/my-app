export interface SavingGoal {
  id?: string;

  // Nama target
  name: string;

  // Target uang
  targetAmount: number;

  // Uang yang sudah terkumpul
  currentAmount: number;

  // Target selesai
  targetDate: string;

  // Warna progress
  color: string;

  // Icon emoji
  icon: string;

  // Catatan
  notes?: string;

  // Status
  status: "active" | "completed";

  createdAt?: string;
}