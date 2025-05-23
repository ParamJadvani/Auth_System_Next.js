"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MailIcon } from "lucide-react";
import useAuth from "@/hooks/use-Auth";
import { toast } from 'react-toastify';
import Loading from '@/app/loading';

export default function VerifyPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const { logout, resendEmailVerification, verifyEmail } = useAuth();


    useEffect(() => {
        if (!token) return;
        (async () => {
            await verifyEmail(token);
        })();
    }, [token, verifyEmail]);


    const onResend = useCallback(async () => {
        await resendEmailVerification();
    }, [resendEmailVerification]);


    const onLogout = useCallback(async () => {
        await logout();
        toast.success("Logout Successful");
    }, [logout]);


    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-gray-50">
                <Card className="p-6 max-w-sm w-full space-y-4 text-center border-none shadow-lg">
                    <CardHeader className="flex justify-center p-0">
                        <MailIcon className="w-12 h-12 text-blue-600" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Email Verification Required
                        </h1>
                        <p className="text-base text-gray-600">
                            Please verify your account by clicking the link sent to your email
                            address.
                        </p>
                        <p className="text-sm text-gray-500">
                            If the email is not in your inbox, check your spam folder or{" "}
                            <Button
                                variant="link"
                                onClick={onResend}
                                className="p-0 h-auto text-blue-600"
                            >
                                click here
                            </Button>{" "}
                            to resend.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button variant="destructive" onClick={onLogout}>
                                Logout
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return <Loading />
}
