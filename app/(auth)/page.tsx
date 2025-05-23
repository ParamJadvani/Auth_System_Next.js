"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COMPANY_REGISTER_PAGE, CREDENTIALS_PAGE, LOGIN_PAGE, VERIFY_EMAIL_PAGE } from "@/constants/redirect";
import useAuth from "@/hooks/use-Auth";
import authStore from "@/store/authStore";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
    const user = authStore.getState().user;
    const { logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) return router.push(LOGIN_PAGE);
        if (!user.user?.email_verified_at) return router.replace(VERIFY_EMAIL_PAGE);
        if (!user.user.is_admin) return router.replace(CREDENTIALS_PAGE);
        if (!user.company.length) return router.replace(COMPANY_REGISTER_PAGE);
    }, [user, router]);
    return (
        <main className="flex items-center justify-center">
            <Card className="w-full max-w-3xl shadow-xl rounded-2xl p-6 sm:p-8 dark:bg-zinc-900">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold mb-4">
                        Welcome to the Auth System
                    </CardTitle>
                    <Image
                        src="/next.svg"
                        alt="Next.js logo"
                        width={120}
                        height={30}
                        className="mx-auto dark:invert"
                    />
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="flex justify-center ">
                        <Button
                            variant="destructive"
                            onClick={async () => {
                                await logout();
                                toast.success("Logout Successful");
                            }}
                            className="rounded-full flex items-center justify-center hover:border-transparent font-medium text-sm sm:text-base h-8
                             sm:h-10 px-4 sm:px-5 w-full sm:w-auto md:w-[158px] text-white"
                        >
                            Logout
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
