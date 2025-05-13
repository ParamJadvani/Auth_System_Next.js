import { HOME_PAGE } from "@/constants/redirect";
import useNavigation from "@/hooks/useNavigation";
import API from "@/lib/axios";
import { CompanyDataValues } from "@/lib/validations/company";

export default function useCompany() {
    const pushPath = useNavigation().pushPath;
    const registerCompany = async (data: CompanyDataValues) => {
        try {
            await API.post("/company", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            pushPath(HOME_PAGE);
        } catch {}
    };

    return { registerCompany };
}
