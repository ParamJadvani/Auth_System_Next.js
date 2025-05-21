"use client";

import { useForm } from "react-hook-form";
import { FormControl } from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { IconInput } from "@/components/ui/icon-Input";
import { CardContent } from "@/components/ui/card";
import useAuth from "@/hooks/use-Auth";
import { FORGOT_PASSWORD_PAGE, REGISTER_PAGE } from "@/constants/redirect";
import { ILoginValues } from '@/types/auth';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { AuthFooter } from '@/components/auth/AuthFooter';
import Loading from '@/app/loading';
import { Suspense } from 'react';
import { PasswordInput } from '@/components/ui/password-Input';

export default function LoginPage() {
    const form = useForm<ILoginValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const { login: loginAction } = useAuth();

    const onSubmit = async (data: ILoginValues) => {
        await loginAction(data);
    };

    useEffect(() => {
        if (!token) return;
        (async () => {
            await loginAction(undefined, token);
        })();
    }, [token, loginAction]);

    return (
        <Suspense fallback={<Loading />}>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <AuthForm
                    title="Login"
                    description="Sign in to your account"
                >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardContent className="space-y-4">
                                <FormControl className="space-y-1">
                                    <IconInput
                                        id="email"
                                        label="Email Address"
                                        type="email"
                                        required={true}
                                        {...form.register("email")}
                                    />
                                </FormControl>
                                <FormControl className="space-y-1">
                                    <PasswordInput
                                        id="password"
                                        label="Password"
                                        required={true}
                                        {...form.register("password")}
                                    />
                                </FormControl>
                            </CardContent>
                            <AuthFooter
                                isLoading={form.formState.isLoading}
                                buttonText="Login"
                                redirectText="Don't have an account?"
                                redirectLinkText="Register"
                                redirectHref={REGISTER_PAGE}
                                forgotPasswordHref={FORGOT_PASSWORD_PAGE}
                            />
                        </form>
                    </Form>
                </AuthForm>
            </div>
        </Suspense>
    )
}