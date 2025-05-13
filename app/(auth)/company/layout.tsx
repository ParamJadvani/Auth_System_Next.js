"use client";

import authStore from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CompanyAccountLayout({ children }: { children: React.ReactNode }) {
    const user = authStore.getState().user;
    const router = useRouter();

    useEffect(() => {
        if (user && user.company.length > 0) {
            router.replace(HOME_PAGE)
        }
    }, [user, router]);

    return <>{children}</>


}