import API from "@/lib/axios";
import { CompanyDataValues } from "@/lib/validations/company";
import { handleAPIError } from "@/utils/apiErrorHandling";

export default function useCompany() {
    const registerCompany = async (
        data: CompanyDataValues
    ): Promise<{ error: boolean; message: string[] }> => {
        try {
            const res = await API.post("/company", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return { error: false, message: [res.data.success] };
        } catch (err) {
            return handleAPIError(err, "Error in Registration of Company.Please try again.") as {
                error: boolean;
                message: string[];
            };
        }
    };

    return { registerCompany };
}
