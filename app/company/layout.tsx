"use client";

import { HOME_PAGE, LOGIN_PAGE } from '@/constants/redirect';
import useAuth from '@/hooks/use-Auth';
import useNavigation from '@/hooks/use-Navigation';
import authStore from '@/store/authStore';
import { useEffect } from 'react';

export default function CompanyAccountLayout({ children }: { children: React.ReactNode }) {
    const user = authStore.getState().user;
    const replacePath = useNavigation().replacePath;
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            replacePath(LOGIN_PAGE);
        }
        if (user && user.company.length > 0) {
            replacePath(HOME_PAGE)
        }
    }, [user, isLoggedIn, replacePath]);

    return <>{children}</>

}