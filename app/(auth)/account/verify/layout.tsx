"use client";
import { COMPANY_ACCOUNT_PAGE_REDIRECT } from "@/constants/redirect";
import authStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        if (authStore.getState().user?.user?.email_verified_at && authStore.getState().user?.company.length === 0) {
            router.push(COMPANY_ACCOUNT_PAGE_REDIRECT);
        }
        if (authStore.getState().user?.user?.email_verified_at) {
            router.push("/");
        }
    }, [router]);
    return <div>{children}</div>;
}
