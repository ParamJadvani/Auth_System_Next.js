"use client"


import { AdminEditForm } from '@/app/(auth)/admin/[id]/_adminEditPage';
import useAdmin from '@/hooks/use-Admin';
import { IAdminValues } from '@/types/admin';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function AdminEditPage() {
    const params = useParams();
    const [data, setData] = useState<IAdminValues | null>(null);
    const { getAdminDetails } = useAdmin();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAdminDetails(Number(params.id));
                setData(data);
            } catch { }
        };
        fetchData();
    }, [])

    return <div>
        {data && <AdminEditForm data={data} />}
    </div>;
}