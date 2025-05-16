"use client"


import { EmployeeEditForm } from '@/app/(auth)/employees/[id]/_EmployeeEditForm';
import useEmployees from '@/hooks/use-employees';
import { IEmployeeValues } from '@/types/employees';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function EmployeeEditPage() {
    const params = useParams();
    const [data, setData] = useState<IEmployeeValues | null>(null);
    const { getEmployeeDetails } = useEmployees();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEmployeeDetails(Number(params.id));
                setData(data);
            } catch { }
        };
        fetchData();
    }, [])

    return <div>
        {data && <EmployeeEditForm data={data} />}
    </div>;
}