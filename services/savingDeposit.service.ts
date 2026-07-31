import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import type { SavingDeposit } from "@/types/savingDeposit";

const COLLECTION_NAME = "saving_deposits";

// Ambil semua setoran berdasarkan goal
export async function getSavingDeposits(
  goalId: string
): Promise<SavingDeposit[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("goalId", "==", goalId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...(docItem.data() as Omit<SavingDeposit, "id">),
  }));
}

// Tambah setoran
export async function addSavingDeposit(
  deposit: Omit<SavingDeposit, "id">
): Promise<void> {
  await addDoc(
    collection(db, COLLECTION_NAME),
    deposit
  );
}

// Hapus setoran
export async function deleteSavingDeposit(
  id: string
): Promise<void> {
  await deleteDoc(
    doc(db, COLLECTION_NAME, id)
  );
}