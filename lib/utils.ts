import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
const uuidv4 = require('uuid');
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function uuid(){
  
  return uuidv4.v4().toString();
}