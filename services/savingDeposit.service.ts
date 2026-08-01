import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import type { SavingDeposit } from "@/types/savingDeposit";

const COLLECTION_NAME = "saving_deposits";

// ===============================
// Ambil semua setoran berdasarkan target
// ===============================
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
    ...(docItem.data() as Omit<
      SavingDeposit,
      "id"
    >),
  }));
}

// ===============================
// Tambah Setoran
// ===============================
export async function addSavingDeposit(
  deposit: Omit<SavingDeposit, "id">
): Promise<void> {
  await addDoc(
    collection(db, COLLECTION_NAME),
    deposit
  );
}

// ===============================
// Update Setoran
// ===============================
export async function updateSavingDeposit(
  id: string,
  deposit: Omit<SavingDeposit, "id">
): Promise<void> {
  await updateDoc(
    doc(db, COLLECTION_NAME, id),
    {
      ...deposit,
    }
  );
}

// ===============================
// Hapus Setoran
// ===============================
export async function deleteSavingDeposit(
  id: string
): Promise<void> {
  await deleteDoc(
    doc(db, COLLECTION_NAME, id)
  );
}