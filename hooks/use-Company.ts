import { HOME_PAGE } from "@/constants/redirect";
import API from "@/lib/axios";
import { ICompanyDataValues } from "@/types/company";
import { useRouter } from "next/navigation";

export default function useCompany() {
    const router = useRouter();
    const registerCompany = async (data: ICompanyDataValues) => {
        try {
            await API.post("/company", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            router.push(HOME_PAGE);
        } catch {}
    };

    const getCompany = async (id: string): Promise<ICompanyDataValues | undefined> => {
        try {
            const res = await API.get(`/company/${id}`);
            return res.data;
        } catch {}
    };

    const updateCompany = async (id: number, data: FormData): Promise<boolean> => {
        try {
            await API.post(`/company/${id}`, data);
            return false;
        } catch {
            return true;
        }
    };

    return { registerCompany, getCompany, updateCompany };
}
