import API from "@/lib/axios";
import { UserSalariesResponse } from "@/types/salary";
import { useCallback } from "react";

export default function useSalary() {
    return {
        get: useCallback(async (id: number): Promise<UserSalariesResponse | undefined> => {
            try {
                const res = await API.get(`/salary/${id}`);
                return res.data;
            } catch {}
        }, []),

        post: async (id: number, data: FormData) => {
            try {
                await API.post(`/salary/${id}`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                return true;
            } catch {
                return false;
            }
        },

        delete: async (id: number) => {
            try {
                await API.delete(`/salary/${id}`);
            } catch {}
        },
    };
}
