"use client";

import { HOME_PAGE } from '@/constants/redirect';
import useNavigation from '@/hooks/useNavigation';
import authStore from '@/store/authStore';
import { useEffect } from 'react';

export default function CompanyAccountLayout({ children }: { children: React.ReactNode }) {
    const user = authStore.getState().user;
    const replacePath = useNavigation().replacePath;

    useEffect(() => {
        if (user && user.company.length > 0) {
            replacePath(HOME_PAGE)
        }
    }, [user, replacePath]);

    return <>{children}</>


}