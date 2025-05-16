"use client";

import { HOME_PAGE, LOGIN_PAGE } from '@/constants/redirect';
import useAuth from '@/hooks/use-Auth';
import { useRouter } from 'next/navigation';
import authStore from '@/store/authStore';
import { useEffect } from 'react';

export default function CompanyAccountLayout({ children }: { children: React.ReactNode }) {
    const user = authStore.getState().user;
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace(LOGIN_PAGE);
        }
        if (user && user.company.length > 0 && Boolean(user.user?.is_admin)) {
            router.replace(HOME_PAGE)
        }
    }, [user, isLoggedIn, router]);

    return <>{children}</>

}