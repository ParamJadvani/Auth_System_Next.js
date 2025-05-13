import API from "@/lib/axios";
import { CompanyDataValues } from "@/lib/validations/company";

export default function useCompany() {
    const registerCompany = async (
        data: CompanyDataValues
    ): Promise<{ error: boolean; message: string }> => {
        try {
            const res = await API.post("/company", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return { error: false, message: res.data.success };
        } catch {
            return { error: true, message: "Failed to register company." };
        }
    };

    return { registerCompany };
}
