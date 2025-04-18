// Import utilities for class name merging
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names using clsx and tailwind-merge.
 * @param inputs - Class names to merge
 * @returns A single merged class name string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}