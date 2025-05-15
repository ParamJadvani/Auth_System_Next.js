// app/auth/layout.tsx
"use client";

import { useEffect } from "react";
import useAuth from "@/hooks/use-Auth";
import { LOGIN_PAGE } from '@/constants/redirect';
import useNavigation from '@/hooks/use-Navigation';
import ParentSidebar from '@/components/sidebar/ParentSidebar';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { isLoggedIn } = useAuth();
    const replacePath = useNavigation().replacePath;


    useEffect(() => {
        if (!isLoggedIn) {
            replacePath(LOGIN_PAGE);
        }
    }, [isLoggedIn, replacePath]);

    if (!isLoggedIn) {
        return null;
    }

    return (
        <ParentSidebar>
            {children}
        </ParentSidebar>
    );
}