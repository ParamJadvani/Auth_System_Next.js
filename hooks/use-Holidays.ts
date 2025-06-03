import API from "@/lib/axios";
import { IHolidayFormValues, IHolidayValues } from "@/types/holidays";
import { useCallback } from "react";

export default function useHolidays() {
    const addHolidays = useCallback(async (data: IHolidayFormValues) => {
        try {
            await API.post("/holidays", data);
            return true;
        } catch {
            return false;
        }
    }, []);

    const getHolidays = useCallback(
        async (year?: number): Promise<Array<IHolidayValues> | undefined> => {
            try {
                const res = await API.get(`/holidays?year=${year}`);
                return res.data;
            } catch {}
        },
        []
    );

    const updateHoliday = useCallback(async (id: number, data: IHolidayFormValues) => {
        try {
            await API.post(`/holidays/${id}`, data);
            return true;
        } catch {
            return false;
        }
    }, []);

    const deleteHoliday = useCallback(async (id: number) => {
        try {
            await API.delete(`/holidays/${id}`);
        } catch {}
    }, []);

    const getHolidaysById = useCallback(async (id: number): Promise<IHolidayValues | undefined> => {
        try {
            const res = await API.get(`/holidays/${id}`);
            return res.data;
        } catch {}
    }, []);

    return { addHolidays, getHolidays, deleteHoliday, updateHoliday, getHolidaysById };
}
