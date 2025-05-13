"use client";
import { COMPANY_REGISTER_PAGE, HOME_PAGE } from "@/constants/redirect";
import useNavigation from '@/hooks/useNavigation';
import authStore from "@/store/authStore";
import { useEffect } from "react";

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
    const pushPath = useNavigation().pushPath;

    useEffect(() => {
        if (authStore.getState().user?.user?.email_verified_at && authStore.getState().user?.company.length === 0) {
            pushPath(COMPANY_REGISTER_PAGE);
        }
        if (authStore.getState().user?.user?.email_verified_at) {
            pushPath(HOME_PAGE);
        }
    }, [pushPath]);
    return <div>{children}</div>;
}
