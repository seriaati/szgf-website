import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Astro.url.pathname ends in .html at build time because of build.format "file".
export function pagePath(url: URL) {
  return url.pathname.replace(/(\/index)?\.html$/, "") || "/";
}
