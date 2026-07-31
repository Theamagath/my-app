    "use client";
    import type { Transaction } from "@/types/transaction";

    import { useEffect, useState } from "react";
    import { getTransactions } from "@/services/transaction.service";

    export function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadTransactions() {
        const data = await getTransactions();
        setTransactions(data);
        setLoading(false);
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    return {
        transactions,
        loading,
        reload: loadTransactions,
    };
    }