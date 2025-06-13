export interface TotalPayableItem {
    totalSalary: number;
    totalNetPayable: number;
    totalEmployeePf: number;
    totalEmployeeEsi: number;
    totalTds: number;
    totalPt: number;
    totalEmployerPf: number;
    totalEmployerEsi: number;
    totalAdminPf: number;
    totalEdliPf: number;
    totalBonus: number;
    totalDeduction: number;
    totalExpenses: number;
    leaveEncash: number;
}

export interface HolidayItem {
    holiday_name: string;
    holiday_date: string;
    week_day: string;
}

export interface InterviewItem {
    id: number;
    interview_id: number;
    company_id: number;
    no: number;
    type: string;
    interviewer_name: string;
    mode: string;
    start_time: string;
    end_time: string;
    interviewer_note: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    firstname: string;
    lastname: string;
    position: string | null;
}

export interface DashboardResponse {
    totalPayable: TotalPayableItem[];
    holiday: HolidayItem[];
    leave: [];
    interview: InterviewItem[];
    total_user: number;
}
