import API from "@/lib/axios";
import { useCallback } from "react";

export default function usePay() {
    return {
        getPayTableData: useCallback(
            async ({
                month = "june",
                financial_year = "2025-2026",
                filter = "",
                sort_order = "desc",
                sort_column = "employee_id",
                page = 1,
                limit = 100,
                is_hold_salary = undefined,
            }: {
                month?: string;
                financial_year?: string;
                filter?: string;
                sort_order?: string;
                sort_column?: string;
                page?: number;
                limit?: number;
                is_hold_salary?: number;
            }) => {
                try {
                    const defaultURL = is_hold_salary
                        ? `/pay?month=${month}&financial_year=${financial_year}&filter=${filter}&sort_order=${sort_order}&sort_column=${sort_column}&is_hold_salary=1`
                        : `/pay?month=${month}&financial_year=${financial_year}&filter=${filter}&sort_order=${sort_order}&sort_column=${sort_column}&page=${page}&limit=${limit}`;
                    //
                    const res = await API.get(defaultURL);
                    return res.data;
                } catch {
                    return null;
                }
            },
            []
        ),

        getHoldSalaryData: useCallback(async () => {
            try {
                const defaultURL = `/pay/hold-salary?month=june&financial_year=2025-2026&filter=&sort_order=desc&sort_column=employee_id&page=1&limit=100`;
                const res = await API.get(`${defaultURL}`);
                return res.data;
            } catch {
                return null;
            }
        }, []),
    };
}
