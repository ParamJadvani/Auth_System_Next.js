"use client";

import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useLayoutEffect(() => {
        if (!isLoggedIn) {
            router.replace("/login");
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) {
        return null;
    }

    return <div>{children}</div>;
}
