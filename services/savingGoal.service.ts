import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import type { SavingGoal } from "@/types/savingGoal";

const COLLECTION_NAME = "saving_goals";

// Ambil semua target tabungan
export async function getSavingGoals(): Promise<SavingGoal[]> {
  const snapshot = await getDocs(
    collection(db, COLLECTION_NAME)
  );

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...(docItem.data() as Omit<SavingGoal, "id">),
  }));
}

// Tambah target
export async function addSavingGoal(
  goal: Omit<SavingGoal, "id">
): Promise<void> {
  await addDoc(
    collection(db, COLLECTION_NAME),
    goal
  );
}

// Update target
export async function updateSavingGoal(
  id: string,
  goal: Omit<SavingGoal, "id">
): Promise<void> {
  await updateDoc(
    doc(db, COLLECTION_NAME, id),
    {
      ...goal,
    }
  );
}

// Hapus target
export async function deleteSavingGoal(
  id: string
): Promise<void> {
  await deleteDoc(
    doc(db, COLLECTION_NAME, id)
  );
}