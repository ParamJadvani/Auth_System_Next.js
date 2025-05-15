interface Address {
    city: string;
    state: string;
    country: string;
    pincode: number;
    residential: string;
}

interface BankInfo {
    bank_name: string;
    ifsc_code: string;
    account_no: number;
    branch_name: string;
    account_holder_name: string;
    account_type: string;
}

interface ContactNo {
    home: number;
}

interface EducationInfo {
    degree: string;
    college_name: string;
    end_month_year: string;
    start_month_year: string;
}

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

export interface ICreateAdminValues extends BaseAdminValues {
    password: string;
}

export interface IAdminValues extends BaseAdminValues {
    id: number;
    aadhar_card: string;
    abry_contribution: number;
    address: Address;
    city: string;
    country: string;
    pincode: number;
    residential: string;
    state: string;
    bank_info: BankInfo;
    account_holder_name: string;
    account_no: number;
    account_type: string;
    bank_name: string;
    branch_name: string;
    ifsc_code: string;
    company_id: number;
    contact_no: ContactNo;
    home: number;
    created_at: string;
    date_of_birth: string;
    date_of_joining: string;
    deleted_at: string | null;
    designation: string;
    education_info: EducationInfo;
    college_name: string;
    degree: string;
    end_month_year: string;
    start_month_year: string;
    email: string;
    email_verified_at: string;
    employee_id: string | null;
    esi_contribution: number;
    esi_no: string;
    file_size_limit: number;
    hold_paid_at: string | null;
    hold_percentage: number | null;
    is_admin: number;
    is_super_admin: number;
    last_working_date: string;
    lastname: string;
    middlename: string;
    nationality: string;
    next_increment_date: string | null;
    pan_card: string;
    pf_account_no: string;
    pf_contribution: number;
    probation_end_date: string;
    remember_me_token: string | null;
    salary_contract_period: string | null;
    salary_increment_date: string | null;
    two_factor_secret: string | null;
    uan_no: string;
    updated_at: string;
    used_size: number;
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
