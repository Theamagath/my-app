import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function addTransaction(data: {
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}) {
  await addDoc(collection(db, "transactions"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}