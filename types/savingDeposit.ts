export interface SavingDeposit {
  id?: string;

  // Relasi ke target tabungan
  goalId: string;

  // Nominal setoran
  amount: number;

  // Tanggal setoran
  date: string;

  // Catatan
  notes?: string;

  createdAt?: string;
}