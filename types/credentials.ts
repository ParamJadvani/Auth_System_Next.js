import { Meta } from "@/types/admin";

export interface CredentialAdditional {
    label: string;
    value: string;
}

export interface CredentialFormValues {
    customFields: CredentialAdditional[];
    file: FileList;
    name: string;
    notes: string;
    password: string;
    username: string;
    website: string[];
    tags?: string[];
}

export interface CredentialData {
    id: number;
    user_id: number;
    company_id: number;
    name: string;
    website: string[];
    username: string;
    mobile_number: string | null;
    note: string | null;
    additional: CredentialAdditional[];
    two_factor_secret: string | null;
    created_at: string;
    updated_at: string;
    pass: string;
}

export interface CredentialResponse {
    meta: Meta;
    data: CredentialData[];
}
