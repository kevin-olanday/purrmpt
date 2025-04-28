"use client";

import { useEffect, useState } from "react";
import { Cat } from "lucide-react";
import { motion } from "framer-motion";

export function PurrmptCounter({ refresh }: { refresh?: number }) {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/purrmpt-count/total")
      .then((res) => res.json())
      .then((data) => setTotal(data.total));
  }, [refresh]);

  if (total === null) return null; // Optional early return

  return (
    <div
      className="
        mt-6 inline-flex items-center justify-center gap-2
        text-xs md:text-sm font-medium
        text-purple-700 dark:text-purple-200
        bg-gradient-to-r from-purple-200/70 to-indigo-200/70 dark:from-purple-700/70 dark:to-indigo-800/70
        backdrop-blur-md
        rounded-full px-4 py-1.5
        border border-purple-300/60 dark:border-purple-700/40
        shadow-sm
        mx-auto
      "
    >
      <Cat className="w-4 h-4 text-purple-500 dark:text-purple-300" />
      <motion.span
        key={total}
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: [1, 1.15, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 0.5, ease: "easeOut", times: [0, 0.4, 1], type: "tween" }}
        className="tabular-nums tracking-wide inline-block"
      >
        {total.toLocaleString()} purrmpts generated
      </motion.span>
    </div>
  );
}
