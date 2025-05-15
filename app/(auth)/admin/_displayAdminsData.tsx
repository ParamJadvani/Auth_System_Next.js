"use server"

import { AdminTable } from '@/components/admin/table';
import API from '@/lib/axios'
import { AdminsResponse } from '@/types/admin';

const getAdminsData = async (): Promise<AdminsResponse | undefined> => {
    try {
        const res = await API.get('/admins');
        return res.data;
    } catch { }

};

export async function DisplayAdminsData() {
    const data = await getAdminsData();
    console.log(data)
    return <div>
        {data && <AdminTable data={data.data} />}
    </div>
}
