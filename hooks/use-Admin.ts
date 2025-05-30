import API from "@/lib/axios";
import { AdminsResponse, ICreateAdminValues, IUpdateAdminValues } from "@/types/admin";
import { useCallback } from "react";

export default function useAdmin() {
    const createAdmin = useCallback(async (data: ICreateAdminValues): Promise<boolean> => {
        try {
            await API.post("/admins", data);
            return false;
        } catch {
            return true;
        }
    }, []);

    const updateAdmin = useCallback(async (id: number, data: IUpdateAdminValues) => {
        try {
            await API.post(`/admins/${id}`, data);
            return true;
        } catch {
            return false;
        }
    }, []);

    const deleteAdmin = useCallback(async (id: number) => {
        try {
            await API.delete(`/admins/${id}`);
        } catch {}
    }, []);

    const getAdminDetails = useCallback(async (id: number) => {
        try {
            const res = await API.get(`/admins/${id}`);
            return res.data;
        } catch {
            return null;
        }
    }, []);

    const getAdmins = useCallback(
        async ({
            filter = "",
            date_of_joining = "",
            last_working_date = "",
            status = "",
            page = 1,
            limit = 10,
            sort_column = "employee_id",
            sort_order = "desc",
        }): Promise<AdminsResponse | null> => {
            const defaultURL = `/admins?filter=${filter}&date_of_joining=${date_of_joining}&last_working_date=${last_working_date}&status=${status}&page=${page}&limit=${limit}&sort_column=${sort_column}&sort_order=${sort_order}`;
            try {
                const res = await API.get(defaultURL);
                return res.data;
            } catch {
                return null;
            }
        },
        []
    );

    return { createAdmin, getAdmins, updateAdmin, deleteAdmin, getAdminDetails };
}
