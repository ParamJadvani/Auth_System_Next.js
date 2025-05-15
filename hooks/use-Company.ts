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

    return { registerCompany };
}
