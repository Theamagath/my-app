"use client";

import { useCallback, useEffect, useState } from "react";

import {
  addDebt,
  deleteDebt,
  getDebts,
  updateDebt,
} from "@/services/debt.service";

import type { Debt } from "@/types/debt";

export function useDebts() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] =
    useState(true);

  const reload = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getDebts();
      setDebts(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  async function createDebt(
    debt: Omit<Debt, "id">
  ) {
    await addDebt(debt);
    await reload();
  }

  async function editDebt(
    id: string,
    debt: Omit<Debt, "id">
  ) {
    await updateDebt(id, debt);
    await reload();
  }

  async function removeDebt(
    id: string
  ) {
    await deleteDebt(id);
    await reload();
  }

  return {
    debts,
    loading,
    reload,
    createDebt,
    editDebt,
    removeDebt,
  };
}