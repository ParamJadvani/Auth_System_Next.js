import { EMPLOYEE_PAGE } from "@/constants/redirect";
import API from "@/lib/axios";
import { EmployeesResponse, ICreateEmployeeValues, IUpdateEmployeeValues } from "@/types/employees";
import { useRouter } from "next/navigation";

export default function useEmployees() {
    const router = useRouter();

    const createEmployee = async (data: ICreateEmployeeValues): Promise<boolean> => {
        try {
            await API.post("/users", data);
            return false;
        } catch {
            return true;
        }
    };

    const updateEmployee = async (id: number, data: IUpdateEmployeeValues) => {
        try {
            await API.post(`/users/${id}`, data);
            router.push(EMPLOYEE_PAGE);
            return true;
        } catch {
            return false;
        }
    };

    const deleteEmployee = async (id: number) => {
        try {
            await API.delete(`/users/${id}`);
        } catch {}
    };

    const getEmployeeDetails = async (id: number) => {
        try {
            const res = await API.get(`/users/${id}`);
            return res.data;
        } catch {
            return null;
        }
    };

    const getEmployeeLoginURL = async (id: number) => {
        try {
            const res = await API.get(`/auth/login/${id}`);
            navigator.clipboard.writeText(res.data.url);
        } catch {
            return null;
        }
    };

    const getEmployee = async ({
        filter = "",
        date_of_joining = "",
        from_date_of_joining = "",
        to_date_of_joining = "",
        last_working_month = "",
        next_increment_month = "",
        designation = "",
        status = "",
        page = 1,
        limit = 10,
        sort_column = "employee_id",
        sort_order = "desc",
    }): Promise<EmployeesResponse | null> => {
        // /users?filter=&date_of_joining=&from_date_of_joining=&to_date_of_joining=&last_working_month=&next_increment_month=&page=1&limit=10&status=&sort_column=employee_id&sort_order=desc&designation=
        const defaultURL = `/users?filter=${filter}&date_of_joining=${date_of_joining}&from_date_of_joining=${from_date_of_joining}&to_date_of_joining=${to_date_of_joining}&last_working_month=${last_working_month}&next_increment_month=${next_increment_month}&page=${page}&limit=${limit}&status=${status}&sort_column=${sort_column}&sort_order=${sort_order}&designation=${designation}`;
        try {
            const res = await API.get(defaultURL);
            return res.data;
        } catch {
            return null;
        }
    };

    return {
        getEmployee,
        createEmployee,
        getEmployeeDetails,
        updateEmployee,
        deleteEmployee,
        getEmployeeLoginURL,
    };
}
