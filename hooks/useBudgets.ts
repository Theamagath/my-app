"use client";

import { useCallback, useEffect, useState } from "react";

import {
  addBudget,
  deleteBudget,
  getBudgets,
  updateBudget,
} from "@/services/budget.service";
import type { Budget } from "@/types/budget";

export function useBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBudgets = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getBudgets();
      setBudgets(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBudgets();
  }, [loadBudgets]);

  async function createBudget(
    budget: Omit<Budget, "id">
  ) {
    await addBudget(budget);
    await loadBudgets();
  }

  async function editBudget(
    id: string,
    budget: Omit<Budget, "id">
  ) {
    await updateBudget(id, budget);
    await loadBudgets();
  }

  async function removeBudget(id: string) {
    await deleteBudget(id);
    await loadBudgets();
  }

  return {
    budgets,
    loading,
    reload: loadBudgets,
    createBudget,
    editBudget,
    removeBudget,
  };
}