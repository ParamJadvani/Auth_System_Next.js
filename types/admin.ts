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
    personal: number;
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

export interface IAdminValues extends BaseAdminValues {
    id: number;
    aadhar_card: string;
    abry_contribution: number;
    created_at: string;
    date_of_birth: string;
    date_of_joining: string;
    deleted_at: string | null;
    designation: string;
    email_verified_at: string;
    employee_id: string | null;
    esi_no: string;
    file_size_limit: number;
    hold_paid_at: string | null;
    hold_percentage: number | null;
    is_admin: number;
    is_super_admin: number;
    next_increment_date: string | null;
    pan_card: string;
    pf_account_no: string;
    remember_me_token: string | null;
    salary_contract_period: string | null;
    salary_increment_date: string | null;
    two_factor_secret: string | null;
    uan_no: string;
    updated_at: string;
    used_size: number;
    address: Address;
    bank_info: BankInfo;
    contact_no: ContactNo;
    education_info: EducationInfo;
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
