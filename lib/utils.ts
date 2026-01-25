/**
 * @file lib/utils.ts
 * @description Shared utility functions for the BroCode Studio application.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
