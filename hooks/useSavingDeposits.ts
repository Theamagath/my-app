"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  addSavingDeposit,
  deleteSavingDeposit,
  getSavingDeposits,
} from "@/services/savingDeposit.service";

import type { SavingDeposit } from "@/types/savingDeposit";

export function useSavingDeposits(
  goalId: string
) {
  const [deposits, setDeposits] =
    useState<SavingDeposit[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadDeposits =
    useCallback(async () => {
      if (!goalId) return;

      setLoading(true);

      try {
        const data =
          await getSavingDeposits(
            goalId
          );

        setDeposits(data);
      } finally {
        setLoading(false);
      }
    }, [goalId]);

  useEffect(() => {
    loadDeposits();
  }, [loadDeposits]);

  async function createDeposit(
    deposit: Omit<SavingDeposit, "id">
  ) {
    await addSavingDeposit(deposit);

    await loadDeposits();
  }

  async function removeDeposit(
    id: string
  ) {
    await deleteSavingDeposit(id);

    await loadDeposits();
  }

  return {
    deposits,
    loading,
    reload: loadDeposits,
    createDeposit,
    removeDeposit,
  };
}