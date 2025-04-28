import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkle } from "@/components/sparkle";

const SPARKLE_COLORS = ["#A78BFA", "#6EE7B7", "#FBBF24", "#c28af9", "#70e6b7"];

type SparkleData = {
  left: number;
  top: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function AnimatedSparkleGroup({ count = 12 }: { count?: number }) {
  const [sparkles, setSparkles] = useState<SparkleData[]>([]);

  useEffect(() => {
    // Only generate sparkles on the client to avoid hydration mismatch
    const generated: SparkleData[] = Array.from({ length: count }).map((_, i) => ({
      size: randomBetween(12, 24),
      color: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
      left: randomBetween(5, 95), // percent
      top: randomBetween(5, 60), // percent
      duration: randomBetween(2.5, 5),
      delay: randomBetween(0, 2),
    }));
    setSparkles(generated);
  }, [count]);

  // Don't render sparkles until after mount
  if (sparkles.length === 0) return null;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {sparkles.map((sparkle, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            pointerEvents: "none",
            opacity: 0.5,
          }}
          initial={{ y: 0, opacity: 0.3 }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            repeatType: "loop",
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        >
          <Sparkle color={sparkle.color} size={sparkle.size} />
        </motion.div>
      ))}
    </div>
  );
}