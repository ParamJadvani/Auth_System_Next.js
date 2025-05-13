"use client";

import { useLayoutEffect } from "react";
import useAuth from "@/hooks/useAuth";
import useNavigation from '@/hooks/useNavigation';
import { HOME_PAGE } from '@/constants/redirect';

export default function NoAuthLayout({ children }: { children: React.ReactNode }) {
    const { isLoggedIn } = useAuth();
    const replacePath = useNavigation().replacePath

    useLayoutEffect(() => {
        if (isLoggedIn) {
            replacePath(HOME_PAGE);
        }
    }, [isLoggedIn, replacePath]);

    if (isLoggedIn) {
        return null;
    }

    return <div>{children}</div>;
}
