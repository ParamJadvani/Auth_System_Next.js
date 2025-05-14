"use server"

import { AdminTable } from '@/components/admin/table';
import API from '@/lib/axios'
import { AdminsResponse } from '@/types/admin';

const getAdminsData = async (): Promise<AdminsResponse> => (await API.get("/admins")).data;

export async function DisplayAdminsData() {
    const data = await getAdminsData();
    return <div>
        <AdminTable data={data.data} />
    </div>
}
