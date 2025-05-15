"use server";

import { AdminEditForm } from '@/app/(auth)/admin/[id]/_adminEditPage';
import API from '@/lib/axios';
import { IAdminValues } from '@/types/admin';

const AdminEditData = async (id: string): Promise<IAdminValues> => {
    try {
        const res = await API.get(`/admins/${id}`);
        return res.data;
    } catch { }
    return {} as IAdminValues;
};

export default async function AdminEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await AdminEditData(id);
    return <div>
        <AdminEditForm data={data} />
    </div>;
}