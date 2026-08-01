import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { Debt } from "@/types/debt";

const COLLECTION = "debts";

export async function getDebts() {
  const snapshot =
    await getDocs(
      collection(db, COLLECTION)
    );

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<
      Debt,
      "id"
    >),
  }));
}

export async function addDebt(
  debt: Omit<Debt, "id">
) {
  await addDoc(
    collection(db, COLLECTION),
    debt
  );
}

export async function updateDebt(
  id: string,
  debt: Omit<Debt, "id">
) {
  await updateDoc(
    doc(db, COLLECTION, id),
    {
      ...debt,
    }
  );
}

export async function deleteDebt(
  id: string
) {
  await deleteDoc(
    doc(db, COLLECTION, id)
  );
}