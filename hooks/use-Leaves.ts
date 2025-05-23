import API from "@/lib/axios";
import { useCallback } from "react";

export default function useLeaves() {
    const getLeavePageData = useCallback(async (): Promise<Array<any> | undefined> => {
        try {
            const res = await API.get("/leaves/dependent/information");
            return res.data;
        } catch {}
    }, []);

    const addLeaves = useCallback(async (data) => {
        try {
            await API.post("/leaves", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch {}
    }, []);

    const getLeavesDate = useCallback(
        async (start_date: string, end_date: string = ""): Promise<Array<any> | undefined> => {
            try {
                const res = await API.get(
                    `/leaves/dates/data?start_date=${start_date}&end_date=${end_date}`
                );
                return res.data;
            } catch {}
        },
        []
    );

    return { getLeavePageData, addLeaves, getLeavesDate };
}
