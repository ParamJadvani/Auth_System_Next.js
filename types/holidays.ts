export interface IHolidayFormValues {
    holiday_name: string;
    holiday_date: string;
    description: string;
}

export interface IHolidayValues {
    company_id: number;
    created_at: string;
    deleted_at: string | null;
    description: string;
    holiday_date: string;
    holiday_name: string;
    id: number;
    updated_at: string;
    week_day: string;
}
