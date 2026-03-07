import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function eraLabel(number: number): string {
  if (number <= 255) return "Methodist Church";
  return "United Methodist Church";
}
