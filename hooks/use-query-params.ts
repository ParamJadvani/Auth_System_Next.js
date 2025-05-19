"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useQueryParams() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const getParams = useCallback(
        (key: string): string | null => {
            return searchParams.get(key);
        },
        [searchParams]
    );

    const setParams = useCallback(
        (key: string, value: string | null) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value === null || value === "") {
                params.delete(key);
            } else {
                params.set(key, value);
            }
            router.replace(`?${params.toString()}`);
        },
        [router, searchParams]
    );

    const removeParams = useCallback(
        (key: string) => {
            setParams(key, null);
        },
        [setParams]
    );

    return { getParams, setParams, removeParams };
}
