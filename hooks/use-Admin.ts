import API from "@/lib/axios";
import { IAdminValues, ICreateAdminValues } from "@/types/admin";
import { useRouter } from "next/navigation";

export default function useAdmin() {
    const router = useRouter();
    const createAdmin = async (data: ICreateAdminValues): Promise<boolean> => {
        try {
            await API.post("/admins", data);
            return false;
        } catch {
            return true;
        }
    };

    const getAdmins = async () => {
        try {
            const res = await API.get("/admins");
            return res.data;
        } catch {}
    };

    const updateAdmin = async (id: number, data: IAdminValues) => {
        try {
            await API.post(`/admins/${id}`, data);
            router.push(`/admin`);
        } catch {}
    };

    const deleteAdmin = async (id: number) => {
        try {
            await API.delete(`/admins/${id}`);
        } catch {}
    };

    const getAdminDetails = async (id: number) => {
        try {
            const res = await API.get(`/admins/${id}`);
            return res.data;
        } catch {}
    };

    return { createAdmin, getAdmins, updateAdmin, deleteAdmin, getAdminDetails };
}
