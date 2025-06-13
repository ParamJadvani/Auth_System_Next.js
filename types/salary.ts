import { Meta } from "@/types/admin";

export interface AddSalary {
    salary_amount: number;
    date_of_increment: string;
    note: string;
    contract_file: File;
}

export interface UserSalary {
    id: number;
    user_id: number;
    company_id: number;
    old: number;
    increment: number;
    current: number;
    percentage: number;
    date_of_increment: string;
    note: string | null;
    contract_file: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    contract_file_url: string | null;
}

export interface UserSalariesResponse {
    userSalaries: {
        meta: Meta;
        data: UserSalary[];
    };
    salaryData: SalaryData;
}

export interface TdsSheetTaxCalculation {
    tax: number;
    tax_5_per: number;
    tax_10_per: number;
    tax_15_per: number;
    tax_20_per: number;
    tax_25_per: number;
    tax_30_per: number;
}

export interface TdsSheetDataSection {
    basic: number;
    hra: number;
    ca: number;
    fa: number;
    le?: number;
    bonus: number;
    deduction: number;
    expenses: number;
}

export interface TdsSheetData {
    actual: TdsSheetDataSection;
    projection: TdsSheetDataSection;
    total: Omit<TdsSheetDataSection, "deduction" | "expenses">;
    total_income: number;
    professionalTax: number;
    standard_deduction: number;
    income_chargeable: number;
    epf_deduction: number;
    net_income: number;
    tax_calculation: TdsSheetTaxCalculation;
    total_income_tds: number;
    education_cess: number;
    payable_tds: number;
    till_last_month_tds: number;
    current_tds: number;
    remain_tds: number;
}

export interface SalaryData {
    id: number;
    userId: number;
    employee_id: string;
    pre_salary_status: string;
    name: string;
    workingDays: number;
    presentDays: number;
    leaveDays: number;
    salary: number;
    basic: number;
    hra: number;
    ca: number;
    fa: number;
    empPf: number;
    empyPf: number;
    adminPf: number;
    edliPf: number;
    empEsi: number;
    empyEsi: number;
    pt: number;
    tds: number;
    totalDeduction: number;
    leaveEncash: number;
    bonus: number;
    deduction: number;
    expenses: number;
    salaryAmount: number;
    subTotal: number;
    netPayable: number;
    status: string;
    tds_sheet_data: TdsSheetData;
    holdAmount: number;
    hold_percentage: number | null;
    loanId: number;
    loanPayment: number;
    isHold: number;
}
