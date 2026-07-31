"use client";

import type { Category } from "@/types/category";
import { deleteCategory } from "@/services/category.service";
import EditCategoryModal from "./EditCategoryModal";

interface CategoryTableProps {
  categories: Category[];
  onReload: () => void | Promise<void>;
}

export default function CategoryTable({
  categories,
  onReload,
}: CategoryTableProps) {
  async function handleDelete(id?: string) {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Yakin ingin menghapus kategori ini?"
    );

    if (!confirmDelete) return;

    await deleteCategory(id);
    await onReload();
  }

  if (categories.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
        Belum ada kategori.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Icon</th>
            <th className="px-4 py-3 text-left">Nama</th>
            <th className="px-4 py-3 text-left">Jenis</th>
            <th className="px-4 py-3 text-left">Warna</th>
            <th className="px-4 py-3 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-t"
            >
              <td className="px-4 py-3 text-2xl">
                {category.icon}
              </td>

              <td className="px-4 py-3">
                {category.name}
              </td>

              <td className="px-4 py-3">
                {category.type === "income"
                  ? "Pemasukan"
                  : "Pengeluaran"}
              </td>

              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div
                    className="h-5 w-5 rounded-full border"
                    style={{
                      backgroundColor: category.color,
                    }}
                  />

                  {category.color}
                </div>
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <EditCategoryModal
                    category={category}
                    onSuccess={onReload}
                  />

                  <button
                    onClick={() =>
                      handleDelete(category.id)
                    }
                    className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}