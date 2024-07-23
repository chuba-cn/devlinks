import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as b from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const saltAndHashPassword = async (password: string) => {
  let hash: string;
  try {
    const salt = await b.genSalt(10);
    hash = await b.hash(password, salt);
  } catch (error) {
    console.log(error);
    return null;
  }
  return hash;
}

export async function wait<T>(ms: number, value: T){
  return new Promise<T>((resolve) => setTimeout(resolve, ms, value));
}