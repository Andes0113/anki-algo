import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function packageError(error: unknown): Error {
  if (error instanceof Error) return error;

  let stringified = '[Unable to stringify error]';

  try {
    stringified = JSON.stringify(error);
  } catch {}

  return new Error(stringified);
}
