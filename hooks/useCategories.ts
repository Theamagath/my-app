"use client";

import { useEffect, useState } from "react";

import type { Category } from "@/types/category";
import { getCategories } from "@/services/category.service";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadCategories() {
    const data = await getCategories();

    setCategories(data);
    setLoading(false);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    reload: loadCategories,
  };
}