import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const percentage = (value: number, total: number) => {
  const calculation = ((value - total) / total) * 100;
  return Number(calculation.toFixed(2));
}
