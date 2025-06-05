import API from "@/lib/axios";
import { TagResponse } from "@/types/tag";
import { useCallback } from "react";

export default function useTags() {
    return {
        getTags: useCallback(
            async ({
                filter,
                page = 1,
                limit = 10,
                sort_column = "name",
                sort_order = "desc",
            }: {
                filter?: string;
                page?: number;
                limit?: number;
                sort_column?: string;
                sort_order?: string;
            }): Promise<TagResponse | undefined> => {
                const defaultURL = `/tags?filter=${filter}&page=${page}&limit=${limit}&sort_column=${sort_column}&sort_order=${sort_order}`;
                try {
                    return (await API.get(defaultURL)).data;
                } catch {}
            },
            []
        ),

        addTag: useCallback(async (data: Record<string, string>) => {
            try {
                await API.post("/tags", data);
                return true;
            } catch {
                return false;
            }
        }, []),

        deleteTag: async (id: number) => {
            try {
                await API.delete(`/tags/${id}`);
            } catch {}
        },

        updateTag: async (id: number, data: Record<string, string>) => {
            try {
                await API.post(`/tags/${id}`, data);
                return true;
            } catch {
                return false;
            }
        },
    };
}
