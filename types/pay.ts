export interface PaySectionResponse {
    meta: Meta;
    employees: Employee[];
    monthYearData: MonthYearData;
    monthlyData: MonthlyData;
}

interface Meta {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    first_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    previous_page_url: string | null;
}

interface Employee {
    id: number;
    user_id: number;
    employee_id: string;
    name: string;
    pre_salary_status: string;
    working_days: number;
    present_days: number;
    leave_days: number;
    salary: number;
    basic: number;
    hra: number;
    ca: number;
    fa: number;
    emp_pf: number;
    empy_pf: number;
    admin_pf: number;
    edli_pf: number;
    emp_esi: number;
    empy_esi: number;
    pt: number;
    tds: number;
    total_deduction: number;
    leave_encash: number;
    bonus: number;
    deduction: number;
    expenses: number;
    salary_amount: number;
    sub_total: number;
    net_payable: number;
    status: string;
    tds_sheet_data: TdsSheetData;
    hold_amount: number;
    hold_percentage: number;
    loan_id: number;
    loan_payment: number;
    is_hold: 0 | 1;
}

interface TdsSheetData {
    actual: IncomeDetails;
    projection: IncomeDetails;
    total: IncomeDetails;
    total_income: number;
    professionalTax: number;
    standard_deduction: number;
    income_chargeable: number;
    epf_deduction: number;
    net_income: number;
    tax_calculation: TaxCalculation;
    total_income_tds: number;
    education_cess: number;
    payable_tds: number;
    till_last_month_tds: number;
    current_tds: number;
    remain_tds: number;
}

interface IncomeDetails {
    basic: number;
    hra: number;
    ca: number;
    fa: number;
    le: number;
    bonus: number;
    deduction: number;
    expenses: number;
}

interface TaxCalculation {
    tax: number;
    tax_5_per: number;
    tax_10_per: number;
    tax_15_per: number;
    tax_20_per: number;
    tax_25_per: number;
    tax_30_per: number;
}

interface MonthYearData {
    current: string;
    month: string;
    previous: string;
    month_days: number;
    year: number;
    financialyear: string;
}

interface MonthlyData {
    ctc: number;
    salary: number;
    leave_encash: number;
    net_payable: number;
    emp_pf: number;
    emp_esi: number;
    tds: number;
    pt: number;
    empy_esi: number;
    empy_pf: number;
    admin_pf: number;
    edli_pf: number;
    bonus: number;
    expenses: number;
    deduction: number;
}
