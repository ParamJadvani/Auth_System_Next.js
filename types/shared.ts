// /types/shared.ts
export interface Address {
    city: string;
    state: string;
    country: string;
    pincode: number;
    residential?: string;
}

export interface BankInfo {
    bank_name: string;
    ifsc_code: string;
    account_no: number;
    branch_name: string;
    account_holder_name: string;
    account_type: string;
}

export interface ContactNo {
    home: number;
    personal: number;
}

export interface EducationInfo {
    degree: string;
    college_name: string;
    start_month_year: string;
    end_month_year: string;
}

export interface FieldConfig<T> {
    id: keyof T;
    label: string;
    type: string;
    placeholder: string;
    disabled?: boolean;
}
