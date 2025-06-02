import API from "@/lib/axios";
import { IHolidayFormValues, IHolidayValues } from "@/types/holidays";

export default function useHolidays() {
    const addHolidays = async (data: IHolidayFormValues) => {
        try {
            await API.post("/holidays", data);
            return false;
        } catch {
            return true;
        }
    };

    const getHolidays = async (year?: number): Promise<Array<IHolidayValues> | undefined> => {
        try {
            const res = await API.get(`/holidays?year=${year}`);
            return res.data;
        } catch {}
    };

    const updateHoliday = async (id: number, data: IHolidayFormValues) => {
        try {
            await API.post(`/holidays/${id}`, data);
            return false;
        } catch {
            return true;
        }
    };

    const deleteHoliday = async (id: number) => {
        try {
            await API.delete(`/holidays/${id}`);
        } catch {}
    };

    const getHolidaysById = async (id: number): Promise<IHolidayValues | undefined> => {
        try {
            const res = await API.get(`/holidays/${id}`);
            return res.data;
        } catch {}
    };

    return { addHolidays, getHolidays, deleteHoliday, updateHoliday, getHolidaysById };
}
