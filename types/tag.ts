import { Meta } from "@/types/admin";
import { CredentialData } from "@/types/credentials";

export interface Tag {
    id: number;
    name: string;
    company_id: number;
    created_at: string;
    created_by: number;
    updated_at: string;
    userCredentials: CredentialData[];
}

export interface TagResponse {
    meta: Meta;
    data: Tag[];
}
