// /types/employees.ts
import { Meta } from "@/types/admin";
import { Address, BankInfo, ContactNo, EducationInfo } from "./shared";

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

export interface IEmployeeValues extends BaseEmployeeValues {
    id: number;
    aadhar_card: string;
    pan_card: string;
    pf_account_no: string;
    uan_no: string;
    esi_no: string;
    file_size_limit: number;
    used_size: number;
    is_admin: number;
    is_super_admin: number;
    designation: string | null;
    email_verified_at: string;
    remember_me_token: string | null;
    two_factor_secret: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    company_id: number;

    address: Address;
    bank_info: BankInfo;
    contact_no: ContactNo;
    education_info: EducationInfo;

    userSalary: unknown | null;
    hold_percentage: number | string;
}

export interface ICreateEmployeeValues extends BaseEmployeeValues {
    password: string;
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
