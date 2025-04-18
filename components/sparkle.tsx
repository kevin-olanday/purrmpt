"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface SparkleProps {
  color?: string
  size?: number
  style?: React.CSSProperties
}

export const Sparkle = ({ color = "#FBBF24", size = 20, style }: SparkleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="sparkle"
      style={style}
    >
      <path
        d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
        fill={color}
      />
    </svg>
  )
}

export const SparkleGroup = ({ count = 3, colors = ["#FBBF24", "#A78BFA", "#6EE7B7"] }) => {
  const [sparkles, setSparkles] = useState<
    Array<{ id: number; color: string; size: number; style: React.CSSProperties }>
  >([])

  useEffect(() => {
    const newSparkles = []
    for (let i = 0; i < count; i++) {
      newSparkles.push({
        id: i,
        color: colors[i % colors.length],
        size: Math.random() * 10 + 10,
        style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
        },
      })
    }
    setSparkles(newSparkles)
  }, [count, colors])

  return (
    <>
      {sparkles.map((sparkle) => (
        <Sparkle key={sparkle.id} color={sparkle.color} size={sparkle.size} style={sparkle.style} />
      ))}
    </>
  )
}
