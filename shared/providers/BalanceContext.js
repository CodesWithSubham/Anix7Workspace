// /utils/BalanceContext.js
"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect, Suspense } from "react";

// Create the context
const BalanceContext = createContext();

// Provider component
export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);

  const { session } = useSession();
  // Fetch balance when the provider mounts
  useEffect(() => {
    if (!session) return;
    async function fetchBalance() {
      try {
        const response = await fetch("/api/balance", {
          method: "GET",
        });
        const result = await response.json();
        if (result.success) {
          setBalance(result.balance);
        } else {
          console.error(result.message || "Failed to fetch balance.");
        }
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    }

    fetchBalance();
  }, [session]);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      <Suspense>{children}</Suspense>
    </BalanceContext.Provider>
  );
};

// Hook to use balance context

export const useBalance = () => useContext(BalanceContext);
