// /types/admin.ts
import { Address, BankInfo, ContactNo, EducationInfo } from "@/types/shared";

interface BaseAdminValues {
    firstname: string;
    lastname: string | null;
    middlename: string | null;
    email: string;
    date_of_birth: string;
    gender: "male" | "female" | "other";
    nationality: string;
    marital_status: "unmarried" | "engaged" | "married";
    blood_group: "a+" | "a-" | "b+" | "b-" | "ab+" | "ab-" | "o+" | "o-" | "" | null;
    date_of_joining: string;
    probation_end_date: string;
    status: "active" | "inactive";
    pf_contribution: number;
    abry_contribution: number;
    esi_contribution: number;
    last_working_date: string | null;
}

export interface IAdminValues extends BaseAdminValues {
    id: number;
    aadhar_card: string;
    designation: string;
    employee_id: string | null;
    pan_card: string;
    pf_account_no: string;
    esi_no: string;
    uan_no: string;
    is_admin: number;
    is_super_admin: number;
    email_verified_at: string;
    file_size_limit: number;
    used_size: number;
    // timestamps
    created_at: string;
    updated_at: string;
    deleted_at: string | null;

    // nested
    address: Address;
    bank_info: BankInfo;
    contact_no: ContactNo;
    education_info: EducationInfo;

    // contributions, hold, etc.
    hold_percentage: number | null;
    hold_paid_at: string | null;
    next_increment_date: string | null;
    salary_contract_period: string | null;
    salary_increment_date: string | null;
    remember_me_token: string | null;
    two_factor_secret: string | null;
}

export interface ICreateAdminValues extends BaseAdminValues {
    password: string;
}

export interface IUpdateAdminValues
    extends Omit<IAdminValues, "address" | "bank_info" | "contact_no" | "education_info">,
        Address,
        BankInfo,
        ContactNo,
        EducationInfo {
    id: number;
}

export interface Meta {
    current_page: number;
    first_page: number;
    first_page_url: string;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    previous_page_url: string | null;
    per_page: number;
    total: number;
}

export interface AdminsResponse {
    data: IAdminValues[];
    meta: Meta;
}
