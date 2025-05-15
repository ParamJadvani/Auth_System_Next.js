"use client";

import { useEffect } from "react";
import useAuth from "@/hooks/use-Auth";
import useNavigation from '@/hooks/use-Navigation';
import { HOME_PAGE } from '@/constants/redirect';

export default function NoAuthLayout({ children }: { children: React.ReactNode }) {
    const { isLoggedIn } = useAuth();
    const replacePath = useNavigation().replacePath

    useEffect(() => {
        if (isLoggedIn) {
            replacePath(HOME_PAGE);
        }
    }, [isLoggedIn, replacePath]);

    if (isLoggedIn) {
        return null;
    }

    return <div>{children}</div>;
}
