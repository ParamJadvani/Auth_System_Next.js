import API from "@/lib/axios";
import { CredentialFormValues, CredentialResponse } from "@/types/credentials";

export default function useCredentials() {
    return {
        addCredentials: async (data: CredentialFormValues, id: number) => {
            try {
                await API.post(`/user/credential/${id}`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } catch {}
        },
        getCredentials: async (id: number): Promise<CredentialResponse | undefined> => {
            try {
                const res = await API.get(`/user/credential/${id}`);
                return res.data;
            } catch {}
        },
    };
}
