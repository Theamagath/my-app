import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import type { Transaction } from "@/types/transaction";

const transactionCollection = collection(db, "transactions");

export async function addTransaction(
  data: Omit<Transaction, "id" | "createdAt">
) {
  await addDoc(transactionCollection, {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function getTransactions(): Promise<Transaction[]> {
  const snapshot = await getDocs(transactionCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Transaction, "id">),
  }));
}

export async function updateTransaction(
  id: string,
  data: Omit<Transaction, "id" | "createdAt">
): Promise<void> {
  const transactionDoc = doc(db, "transactions", id);

  await updateDoc(transactionDoc, {
    ...data,
  });
}

export async function deleteTransaction(
  id: string
): Promise<void> {
  const transactionDoc = doc(db, "transactions", id);

  await deleteDoc(transactionDoc);
}