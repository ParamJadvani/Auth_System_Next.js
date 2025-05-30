// /app/(auth)/admin/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useAdmin from "@/hooks/use-Admin";
import { IAdminValues, ICreateAdminValues, IUpdateAdminValues } from "@/types/admin";
import { AdminForm } from "@/components/admin/form-admin";


export default function AdminDetailPage() {
    const params = useParams();
    const [data, setData] = useState<IAdminValues | null>(null);
    const { getAdminDetails, updateAdmin } = useAdmin();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const adminData = await getAdminDetails(Number(params.id));
                setData(adminData);
            } catch { }
        };
        fetchData();
    }, [getAdminDetails, params]);

    const handleUpdate = async (formData: ICreateAdminValues | IUpdateAdminValues) => {
        const updateData = formData as IUpdateAdminValues;
        await updateAdmin(updateData.id, updateData);
    };

    return (
        <div>
            {data && <AdminForm editing={true} data={data} onSubmit={handleUpdate} />}
        </div>
    );
}