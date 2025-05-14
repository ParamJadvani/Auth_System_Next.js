import useNavigation from "@/hooks/useNavigation";
import API from "@/lib/axios";
import { CreateAdminValues, UpdateAdminValues } from "@/lib/validations/admin";

export default function useAdmin() {
    const pushPath = useNavigation().pushPath;
    const createAdmin = async (data: CreateAdminValues): Promise<boolean> => {
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
            console.log(res.data);
            return res.data;
        } catch {}
    };

    const updateAdmin = async (id: number, data: UpdateAdminValues) => {
        try {
            await API.post(`/admins/${id}`, data);
            pushPath(`/admin`);
        } catch {}
    };

    const deleteAdmin = async (id: number) => {
        try {
            await API.delete(`/admins/${id}`);
        } catch {}
    };

    return { createAdmin, getAdmins, updateAdmin, deleteAdmin };
}
