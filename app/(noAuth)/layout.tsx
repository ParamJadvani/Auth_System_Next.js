"use client";

import { useEffect } from "react";
import useAuth from "@/hooks/use-Auth";
import { HOME_PAGE } from '@/constants/redirect';
import { useRouter } from 'next/navigation';

export default function NoAuthLayout({ children }: { children: React.ReactNode }) {
    const { isLoggedIn } = useAuth();
    const router = useRouter()

    useEffect(() => {
        if (isLoggedIn) {
            router.replace(HOME_PAGE);
        }
    }, [isLoggedIn, router]);

    if (isLoggedIn) {
        return null;
    }

    return <div>{children}</div>;
}
