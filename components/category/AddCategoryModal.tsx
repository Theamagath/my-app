"use client";

import { useState } from "react";
import { toast } from "sonner";

import CategoryForm from "./CategoryForm";

import { addCategory } from "@/services/category.service";
import type { Category } from "@/types/category";

interface AddCategoryModalProps {
  onSuccess: () => void | Promise<void>;
}

export default function AddCategoryModal({
  onSuccess,
}: AddCategoryModalProps) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(
    data: Omit<Category, "id" | "createdAt">
  ) {
    try {
      await addCategory(data);

      await onSuccess();

      toast.success(
        "Kategori berhasil ditambahkan."
      );

      setOpen(false);
    } catch (error) {
      console.error(error);

      toast.error(
        "Gagal menambahkan kategori."
      );
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
      >
        + Tambah Kategori
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Tambah Kategori
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-2xl text-gray-500 transition hover:text-black"
              >
                ×
              </button>
            </div>

            <CategoryForm
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </>
  );
}