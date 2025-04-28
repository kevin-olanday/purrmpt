// components/CounterRefreshContext.tsx
import { createContext, useContext } from "react";

export const CounterRefreshContext = createContext<{
  refresh: () => void;
  value: number;
} | null>(null);

export const useCounterRefresh = () => useContext(CounterRefreshContext);