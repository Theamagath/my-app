"use client";

import { useState } from "react";
import { toast } from "sonner";

import CategoryForm from "./CategoryForm";

import { updateCategory } from "@/services/category.service";
import type { Category } from "@/types/category";

interface EditCategoryModalProps {
  category: Category;
  onSuccess?: () => void | Promise<void>;
}

export default function EditCategoryModal({
  category,
  onSuccess,
}: EditCategoryModalProps) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(
    data: Omit<Category, "id" | "createdAt">
  ) {
    try {
      if (!category.id) {
        toast.error("ID kategori tidak ditemukan.");
        return;
      }

      await updateCategory(category.id, data);

      if (onSuccess) {
        await onSuccess();
      }

      toast.success(
        "Kategori berhasil diperbarui."
      );

      setOpen(false);
    } catch (error) {
      console.error(error);

      toast.error(
        "Gagal memperbarui kategori."
      );
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded bg-yellow-500 px-3 py-1 text-white transition hover:bg-yellow-600"
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Edit Kategori
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-2xl text-gray-500 transition hover:text-black"
              >
                ×
              </button>
            </div>

            <CategoryForm
              defaultValues={category}
              onSubmit={handleSubmit}
              submitLabel="Simpan Perubahan"
            />
          </div>
        </div>
      )}
    </>
  );
}