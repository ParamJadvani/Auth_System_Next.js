import { ICompanyValues } from '@/types/company';

export type IUser = {
    id: number;
    company_id: number | null;
    employee_id: number | null;
    firstname: string;
    middlename: string | null;
    lastname: string;
    email: string;
    status: "active" | "inactive" | string;
    file_size_limit: number;
    used_size: number;
    email_verified_at: string | null;
    remember_me_token: string | null;
    two_factor_secret: string | null;
    gender: "male" | "female" | string;
    marital_status: "married" | "unmarried" | string;
    blood_group: string | null;
    date_of_birth: string | null;
    nationality: string | null;
    is_admin: 0 | 1;
    is_super_admin: 0 | 1;
    date_of_joining: string | null;
    probation_end_date: string | null;
    salary_increment_date: string | null;
    salary_contract_period: string | null;
    next_increment_date: string | null;
    last_working_date: string | null;
    designation: string | null;
    pf_contribution: number;
    abry_contribution: number;
    esi_contribution: number;
    pf_account_no: string | null;
    esi_no: string | null;
    uan_no: string | null;
    aadhar_card: string | null;
    pan_card: string | null;
    address: string | null;
    bank_info: string | null;
    education_info: string | null;
    contact_no: string | null;
    hold_percentage: number | null;
    hold_paid_at: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};


export type IUserStore = {
    company: [ICompanyValues] | [];
    user: IUser | null;
};
