// /app/(auth)/employees/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ICreateEmployeeValues, IEmployeeValues, IUpdateEmployeeValues } from '@/types/employees';
import useEmployees from '@/hooks/use-employees';
import { EmployeeForm } from '@/components/employee/form-employee';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DisplaySalary } from '@/components/salary/display-salary';
import CredentialsPage from '@/app/(auth)/employees/[id]/credentials/_credential_Page';


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
            <Tabs defaultValue="basic">
                <TabsList className='flex justify-between border w-[300px]'>
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="salary">Salary</TabsTrigger>
                    <TabsTrigger value="credentials">Credentials</TabsTrigger>
                </TabsList>
                <TabsContent value="basic">
                    {data && <EmployeeForm editing={true} data={data} onSubmit={handleUpdate} />}
                </TabsContent>
                <TabsContent value="salary">
                    <DisplaySalary id={Number(params.id)} />
                </TabsContent>
                <TabsContent value='credentials'>
                    < CredentialsPage id={Number(params.id)} />
                </TabsContent>
            </Tabs>
        </div>
    );
}