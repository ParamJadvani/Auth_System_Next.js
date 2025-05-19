"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { HOME_PAGE, LOGIN_PAGE } from "@/constants/redirect";
import useAuth from "@/hooks/use-Auth";
import authStore from "@/store/authStore";

export default function CompanyAccountLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isLoggedIn } = useAuth();
    const user = authStore((state) => state.user);

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace(LOGIN_PAGE);
            return;
        }

        if (user && user?.company?.length > 0 && user?.user?.is_admin) {
            router.replace(HOME_PAGE);
            return;
        }
    }, [isLoggedIn, user, router]);

    return <>{children}</>;
}
