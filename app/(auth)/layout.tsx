// app/auth/layout.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/use-Auth";
import { LOGIN_PAGE } from "@/constants/redirect";
import ParentSidebar from "@/components/sidebar/ParentSidebar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) router.replace(LOGIN_PAGE);
    }, [isLoggedIn, router]);

    if (!isLoggedIn) return null;

    return <ParentSidebar>{children}</ParentSidebar>;
}
