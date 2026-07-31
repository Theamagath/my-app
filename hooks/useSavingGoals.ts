"use client";

import { useCallback, useEffect, useState } from "react";

import {
  addSavingGoal,
  deleteSavingGoal,
  getSavingGoals,
  updateSavingGoal,
} from "@/services/savingGoal.service";

import type { SavingGoal } from "@/types/savingGoal";

export function useSavingGoals() {
  const [savingGoals, setSavingGoals] = useState<SavingGoal[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSavingGoals = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getSavingGoals();
      setSavingGoals(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSavingGoals();
  }, [loadSavingGoals]);

  async function createSavingGoal(
    goal: Omit<SavingGoal, "id">
  ) {
    await addSavingGoal(goal);
    await loadSavingGoals();
  }

  async function editSavingGoal(
    id: string,
    goal: Omit<SavingGoal, "id">
  ) {
    await updateSavingGoal(id, goal);
    await loadSavingGoals();
  }

  async function removeSavingGoal(id: string) {
    await deleteSavingGoal(id);
    await loadSavingGoals();
  }

  return {
    savingGoals,
    loading,
    reload: loadSavingGoals,
    createSavingGoal,
    editSavingGoal,
    removeSavingGoal,
  };
}