// /app/(auth)/admin/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useAdmin from "@/hooks/use-Admin";
import { IAdminValues, ICreateAdminValues, IUpdateAdminValues } from "@/types/admin";
import { AdminForm } from "@/app/(auth)/admin/_AdminForm";


export default function AdminEditPage() {
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
            {data && <AdminForm isEditing={true} data={data} onSubmit={handleUpdate} />}
        </div>
    );
}