export interface CreateAdmin {
    firstname: string;
    lastname: string;
    middlename: string;
    email: string;
    password: string;
    date_of_birth: string;
    gender: "male" | "female" | "other";
    nationality: string;
    marital_status: "unmarried" | "engage" | "married";
    blood_group: "a+" | "a-" | "b+" | "b-" | "ab+" | "ab-" | "o+" | "o-";
    date_of_joining: string;
    probation_end_date: string;
    status: "active" | "inactive";
    pf_contribution: number;
    abry_contribution: number;
    esi_contribution: number;
    last_working_date: string;
}

export interface Admin {
    id: number;
    company_id: number;
    firstname: string;
    middlename: string | null;
    lastname: string | null;
    email: string;
    email_verified_at: string;
    contact_no: string | null;
    address: string | null;
    gender: "male" | "female" | "other";
    date_of_birth: string;
    marital_status: "unmarried" | "married" | "engaged";
    nationality: string | null;
    aadhar_card: string | null;
    pan_card: string | null;
    pf_account_no: string | null;
    uan_no: string | null;
    esi_no: string | null;
    designation: string | null;
    employee_id: string | null;
    education_info: string | null;
    bank_info: string | null;
    blood_group: "a+" | "a-" | "b+" | "b-" | "ab+" | "ab-" | "o+" | "o-" | "" | null;
    salary_contract_period: string | null;
    date_of_joining: string;
    probation_end_date: string;
    salary_increment_date: string | null;
    next_increment_date: string | null;
    last_working_date: string | null;
    hold_percentage: number | null;
    hold_paid_at: string | null;
    abry_contribution: number;
    esi_contribution: number;
    pf_contribution: number;
    file_size_limit: number;
    used_size: number;
    status: "active" | "inactive";
    is_admin: number;
    is_super_admin: number;
    two_factor_secret: string | null;
    remember_me_token: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
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
    data: Admin[];
    meta: Meta;
}
