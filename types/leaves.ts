import { Meta } from "@/types/admin";

type LeaveType = "paid" | "non-paid";
type DayType = "full" | "half";
type Status = "pending" | "approved" | "rejected" | "cancelled";
type DayNameType = 0 | 1 | 2;

export interface EmployeeLeaveData {
    id: string;
    employee_id: string;
}

export interface LeaveDateItem {
    date: string;
    day_type: number;
    day_name_type: number;
}

interface LeaveDate {
    id: number;
    leave_id: number;
    user_id: number;
    company_id: number;
    type: number;
    date: string;
    day_name_type: DayNameType;
    day_type: number;
    created_at: string;
    updated_at: string;
}

export interface Leave {
    id: number;
    user_id: number;
    company_id: number;
    day_type: DayType;
    leave_type: LeaveType;
    date: string | null;
    attachment: string | null;
    attachment_url: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    employee_id: string;
    firstname: string;
    from_date: string;
    to_date: string;
    leave_day_count: number;
    deduct_day_count: string;
    note: string;
    status: Status;
    dates: LeaveDate[];
}

export interface LeavesResponse {
    data: Leave[];
    meta: Meta;
}
