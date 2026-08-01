export type DebtType =
  | "debt"
  | "receivable";

export interface Debt {
  id?: string;

  // debt = Utang
  // receivable = Piutang
  type: DebtType;

  // Nama orang
  person: string;

  // Nominal awal
  amount: number;

  // Sisa yang belum dibayar
  remainingAmount: number;

  // Catatan
  notes?: string;

  // Jatuh tempo
  dueDate: string;

  // Status
  status:
    | "unpaid"
    | "partial"
    | "paid";

  createdAt?: string;
}