import API from "@/lib/axios";
import { CredentialData, CredentialFormValues, CredentialResponse } from "@/types/credentials";
import { useCallback } from "react";

export default function useCredentials() {
    return {
        addCredentials: useCallback(
            async (data: CredentialFormValues | undefined, id: number, signedToken?: string) => {
                try {
                    await API.post(`/user/credential/${id}`, signedToken ? { signedToken } : data, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                } catch {}
            },
            []
        ),
        getCredentials: useCallback(
            async (
                id: number,
                {
                    filter = "",
                    page = 1,
                    limit = 10,
                    sort_column = "",
                    sort_order = "desc",
                    tag_ids,
                }: {
                    filter?: string;
                    page?: number;
                    limit?: number;
                    sort_column?: string;
                    sort_order?: string;
                    tag_ids?: number;
                }
            ): Promise<CredentialResponse | undefined> => {
                let defaultURL = `/user/credential/${id}?filter=${filter}&page=${page}&limit=${limit}&sort_column=${sort_column}&sort_order=${sort_order}`;
                if (tag_ids) {
                    defaultURL = `/user/credential/${id}?filter=${filter}&page=${page}&limit=${limit}&sort_column=${sort_column}&sort_order=${sort_order}&tag_ids[]=${tag_ids}`;
                }
                try {
                    const res = await API.get(defaultURL);
                    return res.data;
                } catch {}
            },
            []
        ),
        deleteCredentials: useCallback(async (id: number) => {
            try {
                await API.delete(`/user/credential/${id}`);
            } catch {}
        }, []),
        generateShareLink: async (id: number) => {
            try {
                const res = await API.get(`/user/credential/generate-signed-url?id=${id}`);
                return res.data;
            } catch {}
        },
        getCredentialsDetails: useCallback(
            async (id: number): Promise<CredentialData | undefined> => {
                try {
                    const res = await API.get(`user/credential/show/${id}`);
                    return res.data;
                } catch {}
            },
            []
        ),
        updateCredentials: useCallback(
            async (data: CredentialFormValues, id: number, user_id: number) => {
                try {
                    await API.post(`/user/credential/update/${user_id}/${id}`, data, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                } catch {}
            },
            []
        ),
    };
}
