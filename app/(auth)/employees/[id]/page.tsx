// /app/(auth)/employees/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ICreateEmployeeValues, IEmployeeValues, IUpdateEmployeeValues } from '@/types/employees';
import useEmployees from '@/hooks/use-employees';
import { EmployeeForm } from '@/components/employee/form-employee';


export default function EmployeeDetailPage() {
    const params = useParams();
    const [data, setData] = useState<IEmployeeValues | null>(null);
    const { getEmployeeDetails, updateEmployee } = useEmployees();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const adminData = await getEmployeeDetails(Number(params.id));
                setData(adminData);
            } catch { }
        };
        fetchData();
    }, [getEmployeeDetails, params]);

    const handleUpdate = async (formData: ICreateEmployeeValues | IUpdateEmployeeValues) => {
        const updateData = formData as IUpdateEmployeeValues;
        await updateEmployee(updateData.id, updateData);
    };

    return (
        <div>
            {data && <EmployeeForm editing={true} data={data} onSubmit={handleUpdate} />}
        </div>
    );
}