"use client";

import { useCallback, useEffect, useState } from "react";

import {
  addBill,
  deleteBill,
  getBills,
  updateBill,
} from "@/services/bill.service";

import type { Bill } from "@/types/bill";

export function useBills() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBills = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getBills();
      setBills(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBills();
  }, [loadBills]);

  async function createBill(
    bill: Omit<Bill, "id">
  ) {
    await addBill(bill);
    await loadBills();
  }

  async function editBill(
    id: string,
    bill: Omit<Bill, "id">
  ) {
    await updateBill(id, bill);
    await loadBills();
  }

  async function removeBill(id: string) {
    await deleteBill(id);
    await loadBills();
  }

  return {
    bills,
    loading,
    reload: loadBills,
    createBill,
    editBill,
    removeBill,
  };
}