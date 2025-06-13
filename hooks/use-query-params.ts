"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function useQueryParams() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const getParams = useCallback(
        (key: string): string | null => {
            return searchParams.get(key);
        },
        [searchParams]
    );

    const getAllParams = useCallback((): Record<string, string> => {
        return Object.fromEntries(searchParams.entries());
    }, [searchParams]);

    const applyFilters = useCallback(
        (filters: Record<string, string | null | undefined>) => {
            const current = new URLSearchParams(searchParams.toString());

            Object.entries(filters).forEach(([key, value]) => {
                if (value === null || value === undefined || value === "") {
                    current.delete(key);
                } else {
                    current.set(key, value);
                }
            });

            const newQueryString = current.toString();
            const query = newQueryString ? `?${newQueryString}` : "";

            router.push(`${pathname}${query}`);
        },
        [router, searchParams, pathname]
    );

    const resetAll = useCallback(() => {
        if (!searchParams.toString()) {
            return;
        }

        router.push(pathname);
    }, [router, searchParams, pathname]);

    return { getParams, applyFilters, getAllParams, resetAll };
}
