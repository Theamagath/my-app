import type { Timestamp } from "firebase/firestore";

export type TransactionType =
  | "income"
  | "expense";

export type TransactionAccount =
  | "bank"
  | "wallet";

export interface Transaction {
  id?: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  account?: TransactionAccount;
  createdAt?: Timestamp | null;
}

export type TransactionInput = Omit<
  Transaction,
  "id" | "createdAt"
>;