import { clsx, type ClassValue } from "clsx";
import flatpickr from "flatpickr";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formateDate = (date: string) =>
    flatpickr.formatDate(new Date(date), "d-F-Y").split("-").join(" ");
