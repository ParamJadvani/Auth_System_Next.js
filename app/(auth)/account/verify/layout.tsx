"use client";
import { COMPANY_REGISTER_PAGE } from "@/constants/redirect";
import authStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        if (authStore.getState().user?.user?.email_verified_at && authStore.getState().user?.company.length === 0) {
            router.push(COMPANY_REGISTER_PAGE);
        }
        if (authStore.getState().user?.user?.email_verified_at) {
            router.push(HOME_PAGE);
        }
    }, [router]);
    return <div>{children}</div>;
}
