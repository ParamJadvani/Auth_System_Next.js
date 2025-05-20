"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function useQueryParams() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const getParams = useCallback(
        (key: string): string | null => {
            return searchParams.get(key);
        },
        [searchParams]
    );

    const getAllParams = useCallback((): { key: string; value: string | null }[] => {
        return Array.from(searchParams.entries()).map(([key, value]) => ({
            key,
            value,
        }));
    }, [searchParams]);

    const applyFilters = useCallback(
        (filters: Record<string, string | null | undefined>) => {
            const params = new URLSearchParams(searchParams.toString());

            Object.entries(filters).forEach(([key, value]) => {
                if (value === null || value === undefined || value === "") {
                    params.delete(key);
                } else {
                    params.set(key, value);
                }
            });

            const newQueryString = params.toString();
            const currentQueryString = searchParams.toString();

            if (newQueryString === currentQueryString) {
                return;
            }

            router.replace(`${pathname}?${newQueryString}`);
        },
        [router, searchParams, pathname]
    );

    const resetAll = useCallback(() => {
        if (!searchParams.toString()) {
            return;
        }

        router.replace(pathname);
    }, [router, searchParams, pathname]);

    return { getParams, applyFilters, getAllParams, resetAll };
}
