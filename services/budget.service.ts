import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import type { Budget } from "@/types/budget";

const COLLECTION_NAME = "budgets";

export async function getBudgets(): Promise<Budget[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...(docItem.data() as Omit<Budget, "id">),
  }));
}

export async function addBudget(
  budget: Omit<Budget, "id">
): Promise<void> {
  await addDoc(collection(db, COLLECTION_NAME), budget);
}

export async function updateBudget(
  id: string,
  budget: Omit<Budget, "id">
): Promise<void> {
  await updateDoc(doc(db, COLLECTION_NAME, id), {
    ...budget,
  });
}

export async function deleteBudget(
  id: string
): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}