import { Meta } from "@/types/admin";

// Nested helpers
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
    account_no: string;
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

interface BaseEmployeeValues {
    firstname: string;
    middlename: string | null;
    lastname: string;
    employee_id: string;
    email: string;
    nationality: string;
    gender: "male" | "female" | "other";
    marital_status: "unmarried" | "engaged" | "married";
    date_of_birth: string;
    date_of_joining: string;
    probation_end_date: string;
    salary_increment_date: string | null;
    salary_contract_period: string | null;
    next_increment_date: string | null;
    blood_group: "a+" | "a-" | "b+" | "b-" | "ab+" | "ab-" | "o+" | "o-" | "" | null;
    status: "active" | "inactive";
    last_working_date: string | null;
    pf_contribution: number;
    abry_contribution: number;
    esi_contribution: number;
}

export interface ICreateEmployeeValues extends BaseEmployeeValues {
    password: string;
}

export interface IEmployeeValues extends BaseEmployeeValues {
    aadhar_card: string;

    address: Address;

    bank_info: BankInfo;

    company_id: number;

    contact_no: ContactNo;

    created_at: string;
    deleted_at: string | null;
    designation: string | null;

    education_info: EducationInfo;

    email_verified_at: string;

    esi_no: string;

    file_size_limit: number;

    hold_paid_at: string | null;
    hold_percentage: number;

    id: number;
    is_admin: number;
    is_super_admin: number;

    pan_card: string;
    pf_account_no: string;

    remember_me_token: string | null;

    two_factor_secret: string | null;
    uan_no: string;

    updated_at: string;
    used_size: number;

    userSalary: unknown | null;
}

export interface IUpdateEmployeeValues
    extends Omit<IEmployeeValues, "address" | "bank_info" | "contact_no" | "education_info">,
        Address,
        BankInfo,
        ContactNo,
        EducationInfo {
    id: number;
}

export interface EmployeesResponse {
    data: IEmployeeValues[];
    meta: Meta;
}
