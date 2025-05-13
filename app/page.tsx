"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COMPANY_REGISTER_PAGE, LOGIN_PAGE, VERIFY_EMAIL_PAGE } from "@/constants/redirect";
import useAuth from "@/hooks/useAuth";
import authStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from 'react-toastify';

export default function Home() {
    const user = authStore.getState().user;
    const { logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) return router.push(LOGIN_PAGE);
        if (!user.user?.email_verified_at) return router.push(VERIFY_EMAIL_PAGE);
        if (!user.company.length) return router.replace(COMPANY_REGISTER_PAGE);
    }, [user, router]);
    console.log(user)
    return (
        <main className="min-h-screen flex items-center justify-center bg-muted px-4">
            <Card className="w-full max-w-3xl shadow-xl rounded-2xl p-6 sm:p-8 bg-white dark:bg-zinc-900">
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
                    <ol className="list-decimal list-inside text-sm sm:text-base leading-6 font-mono text-muted-foreground">
                        <li>
                            Edit <code className="font-semibold">app/page.tsx</code> to get started.
                        </li>
                        <li>Save and see your changes instantly.</li>
                    </ol>

                    <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                        <a
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 transition"
                            href="https://vercel.com/new"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src="/vercel.svg"
                                alt="Vercel logo"
                                width={20}
                                height={20}
                                className="dark:invert"
                            />
                            Deploy Now
                        </a>

                        <a
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full dark:border-white/[.15] hover:bg-muted transition"
                            href="https://nextjs.org/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            📚 Docs
                        </a>

                        <Button
                            variant="destructive"
                            onClick={async () => {
                                await logout();
                                toast.success("Logout Successful");
                                router.push(LOGIN_PAGE);
                            }}
                            className="rounded-full flex items-center justify-center hover:border-transparent font-medium text-sm sm:text-base h-8
                             sm:h-10 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
                        >
                            Logout
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
