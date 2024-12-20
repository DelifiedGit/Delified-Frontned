import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateGradient = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, 50%), hsl(${(hue + 60) % 360}, 100%, 50%)`;
};

export const emojis = ["🔥", "💯", "🚀", "😂", "❤️", "🙌", "👀", "🎉"];