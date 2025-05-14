"use server";

import { AdminEditForm } from '@/app/(auth)/admin/[id]/_adminEditPage';
import API from '@/lib/axios';
import { Admin } from '@/types/admin';

const AdminEditData = async (id: string): Promise<Admin> => (await API.get(`/admins/${id}`)).data;

export default async function AdminEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await AdminEditData(id);
    console.log(data)
    return <div>
        <AdminEditForm data={data} />
    </div>;
}