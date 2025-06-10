export interface SalarySlipResponse {
    header: Header[];
    salarySlips: SalarySlip[];
    from_date: string;
    to_date: string;
}

interface Header {
    key: string;
    label: string;
}

export interface SalarySlip {
    salary: number;
    basic: number;
    hra: number;
    ca: number;
    fa: number;
    emp_pf: number;
    empy_pf: number;
    emp_esi: number;
    empy_esi: number;
    admin_pf: number;
    edli_pf: number;
    leave_encash: number;
    pt: number;
    tds: number;
    deduction: number;
    bonus: number;
    expenses: number;
    net_payable: number;
    employee_id?: string;
    employee_name?: string;
    designation?: string;
}
