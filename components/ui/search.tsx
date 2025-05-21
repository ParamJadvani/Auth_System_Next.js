"use client";

import { useRef, useEffect } from "react";
import { IconInput } from "@/components/ui/icon-Input";
import { useQueryParams } from "@/hooks/use-query-params";
import { useDebouncedCallback } from 'use-debounce';

export function Search() {
    const searchRef = useRef<HTMLInputElement>(null);
    const { getParams, applyFilters } = useQueryParams();

    const debouncedSearch = useDebouncedCallback(
        (value: string) => {
            applyFilters({ filter: value || null, page: "1" });
        },
        500,
    )

    useEffect(() => {
        if (searchRef.current) {
            const searchValue = getParams("filter");
            searchRef.current.value = searchValue || "";
        }
    }, [getParams]);

    return (
        <IconInput
            label="Search"
            id="search"
            placeholder="Search"
            ref={searchRef}
            onChange={(e) => debouncedSearch(e.target.value)}
            className="w-full"
        />
    );
}