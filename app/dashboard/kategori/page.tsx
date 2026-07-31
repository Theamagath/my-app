"use client";

import AddCategoryModal from "@/components/category/AddCategoryModal";
import CategoryTable from "@/components/category/CategoryTable";
import { useCategories } from "@/hooks/useCategories";

export default function KategoriPage() {
  const {
    categories,
    loading,
    reload,
  } = useCategories();

  if (loading) {
    return (
      <div className="p-6">
        Memuat kategori...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Kategori
          </h1>

          <p className="text-gray-500">
            Kelola kategori pemasukan dan pengeluaran.
          </p>
        </div>

        <AddCategoryModal
          onSuccess={reload}
        />
      </div>

      <CategoryTable
        categories={categories}
        onReload={reload}
      />
    </div>
  );
}