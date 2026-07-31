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
import type { Category } from "@/types/category";

const categoryCollection = collection(db, "categories");

export async function addCategory(
  data: Omit<Category, "id" | "createdAt">
): Promise<void> {
  await addDoc(categoryCollection, {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function getCategories(): Promise<Category[]> {
  const snapshot = await getDocs(categoryCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Category, "id">),
  }));
}

export async function updateCategory(
  id: string,
  data: Omit<Category, "id" | "createdAt">
): Promise<void> {
  const categoryDoc = doc(db, "categories", id);

  await updateDoc(categoryDoc, {
    ...data,
  });
}

export async function deleteCategory(
  id: string
): Promise<void> {
  const categoryDoc = doc(db, "categories", id);

  await deleteDoc(categoryDoc);
}