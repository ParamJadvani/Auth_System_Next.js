"use client";
import { useForm } from "react-hook-form";
import { FormControl } from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { CardContent, } from "@/components/ui/card";
import useAuth from "@/hooks/use-Auth";
import { LOGIN_PAGE } from "@/constants/redirect";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { IResetPasswordValues } from '@/types/auth';
import { AuthForm } from '@/components/auth/AuthForm';
import { AuthFooter } from '@/components/auth/AuthFooter';
import Loading from '@/app/loading';
import { Suspense } from 'react';
import { PasswordInput } from '@/components/ui/password-Input';

export default function PasswordResetPage() {
    const form = useForm<IResetPasswordValues>({
        defaultValues: {
            password: "",
            password_confirmation: "",
        },
    });

    const searchParams = useSearchParams();
    const url = searchParams.get("token");
    const { resetPassword } = useAuth();
    const router = useRouter();

    const onSubmit = async (data: IResetPasswordValues) => {
        if (url) {
            await resetPassword(data, url);
            form.reset();
        }
    };

    useEffect(() => {
        if (!url) {
            router.push(LOGIN_PAGE);
        }
    }, [url, router]);
    return (
        <Suspense fallback={<Loading />}>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <AuthForm
                    title="Forgot Password"
                    description=""
                >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardContent className="space-y-4">
                                <FormControl>
                                    <PasswordInput
                                        id="password"
                                        label="Password"
                                        {...form.register("password")}
                                    />
                                </FormControl>
                                <FormControl>
                                    <PasswordInput
                                        id="password_confirmation"
                                        label="Confirm Password"
                                        {...form.register("password_confirmation")}
                                    />
                                </FormControl>
                            </CardContent>
                            <AuthFooter
                                isLoading={form.formState.isLoading}
                                buttonText="Reset Password"
                                redirectText="Back to Login"
                                redirectLinkText="Login"
                                redirectHref={LOGIN_PAGE}
                            />
                        </form>
                    </Form>
                </AuthForm>
            </div>
        </ Suspense>
    )
}