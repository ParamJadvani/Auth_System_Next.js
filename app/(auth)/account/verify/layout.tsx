"use client";
import { COMPANY_REGISTER_PAGE, HOME_PAGE } from "@/constants/redirect";
import authStore from "@/store/authStore";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const user = authStore((state) => state.user);

    useEffect(() => {
        if (user?.user && user.user?.email_verified_at && user.company.length === 0) {
            router.push(COMPANY_REGISTER_PAGE);
        }
        if (user?.user && user.user?.email_verified_at) {
            router.push(HOME_PAGE);
        }
    }, [router, user]);
    return <div>{children}</div>;
}
