"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { Category } from "@/types/category";

interface CategoryFormProps {
  defaultValues?: Category;
  onSubmit: (
    data: Omit<Category, "id" | "createdAt">
  ) => void | Promise<void>;
  submitLabel?: string;
}

export default function CategoryForm({
  defaultValues,
  onSubmit,
  submitLabel = "Simpan",
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Category, "id" | "createdAt">>({
    defaultValues: {
      name: "",
      icon: "",
      color: "#3B82F6",
      type: "expense",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name,
        icon: defaultValues.icon,
        color: defaultValues.color,
        type: defaultValues.type,
      });
    } else {
      reset({
        name: "",
        icon: "",
        color: "#3B82F6",
        type: "expense",
      });
    }
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Nama Kategori
        </label>

        <input
          {...register("name", {
            required: "Nama kategori wajib diisi",
          })}
          className="w-full rounded-lg border px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          placeholder="Contoh: Makanan"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Icon
        </label>

        <input
          {...register("icon", {
            required: "Icon wajib diisi",
          })}
          className="w-full rounded-lg border px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          placeholder="🍔"
        />

        {errors.icon && (
          <p className="mt-1 text-sm text-red-500">
            {errors.icon.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Warna
        </label>

        <input
          type="color"
          {...register("color")}
          className="h-12 w-full cursor-pointer rounded-lg border"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Jenis
        </label>

        <select
          {...register("type")}
          className="w-full rounded-lg border px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="expense">
            Pengeluaran
          </option>

          <option value="income">
            Pemasukan
          </option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        {submitLabel}
      </button>
    </form>
  );
}