import API from "@/lib/axios";
import { Leave, LeavesResponse } from "@/types/leaves";
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
            return true;
        } catch {
            return false;
        }
    }, []);

    const getLeavesDate = useCallback(
        async (
            start_date: string,
            end_date: string = "",
            id?: number
        ): Promise<Array<any> | undefined> => {
            const defaultURL = id
                ? `/leaves/dates/data?leave_id=${id}&start_date=${start_date}&end_date=${end_date}`
                : `/leaves/dates/data?start_date=${start_date}&end_date=${end_date}`;
            try {
                const res = await API.get(defaultURL);
                return res.data;
            } catch {}
        },
        []
    );

    const getLeaves = useCallback(
        async ({
            filter = "",
            page = 1,
            limit = 10,
            to_date = "",
            status = "",
            from_date = "",
            sort_column = "created_at",
            sort_order = "desc",
            day_type = "",
            leave_type = "",
            leave_date = "",
        }): Promise<LeavesResponse | undefined> => {
            const defaultURL = `/leaves?filter=${filter}&page=${page}&limit=${limit}&to_date=${to_date}&status=${status}&from_date=${from_date}&sort_column=${sort_column}&sort_order=${sort_order}&day_type=${day_type}&leave_type=${leave_type}&leave_date=${leave_date}`;
            try {
                const res = await API.get(defaultURL);
                return res.data;
            } catch {}
        },
        []
    );

    const deleteLeave = useCallback(async (id: number) => {
        try {
            await API.delete(`/leaves/${id}`);
        } catch {}
    }, []);

    const getLeaveDetailData = useCallback(async (id: number): Promise<Leave | undefined> => {
        try {
            const res = await API.get(`/leaves/${id}`);
            return res.data;
        } catch {}
    }, []);

    const updateLeave = useCallback(async (id: number, data) => {
        try {
            await API.post(`/leaves/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return true;
        } catch {
            return false;
        }
    }, []);

    return {
        getLeavePageData,
        addLeaves,
        getLeavesDate,
        getLeaves,
        deleteLeave,
        getLeaveDetailData,
        updateLeave
    };
}
