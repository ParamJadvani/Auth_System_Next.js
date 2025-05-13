"use client";

import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { LOGIN_PAGE } from '@/constants/redirect';
import useNavigation from '@/hooks/useNavigation';

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

    return <div>{children}</div>;
}
