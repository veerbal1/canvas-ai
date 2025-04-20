import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function replaceLatexDelimiters(content: string): string {
  if (!content) return "";
  return content
    .replace(/\\\[/g, "$")
    .replace(/\\\]/g, "$")
    .replace(/\\\(/g, "$$")
    .replace(/\\\)/g, "$$")
    .replace(/\(\\\(/g, "$")
    .replace(/\\\)\)/g, "$");
}