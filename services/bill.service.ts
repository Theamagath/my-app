import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import type { Bill } from "@/types/bill";

const COLLECTION_NAME = "bills";

// Ambil semua tagihan
export async function getBills(): Promise<Bill[]> {
  const snapshot = await getDocs(
    collection(db, COLLECTION_NAME)
  );

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...(docItem.data() as Omit<Bill, "id">),
  }));
}

// Tambah tagihan
export async function addBill(
  bill: Omit<Bill, "id">
): Promise<void> {
  await addDoc(
    collection(db, COLLECTION_NAME),
    bill
  );
}

// Edit tagihan
export async function updateBill(
  id: string,
  bill: Omit<Bill, "id">
): Promise<void> {
  await updateDoc(
    doc(db, COLLECTION_NAME, id),
    {
      ...bill,
    }
  );
}

// Hapus tagihan
export async function deleteBill(
  id: string
): Promise<void> {
  await deleteDoc(
    doc(db, COLLECTION_NAME, id)
  );
}