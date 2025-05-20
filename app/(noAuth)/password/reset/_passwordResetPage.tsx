"use client";
import { useForm } from "react-hook-form";
import { FormControl } from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { IconInput } from "@/components/ui/icon-Input";
import { CardContent, } from "@/components/ui/card";
import useAuth from "@/hooks/use-Auth";
import { LOGIN_PAGE } from "@/constants/redirect";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { IResetPasswordValues } from '@/types/auth';
import { AuthForm } from '@/components/auth/AuthForm';
import { AuthFooter } from '@/components/auth/AuthFooter';


export default function PasswordResetComponent() {
    const form = useForm<IResetPasswordValues>({
        defaultValues: {
            password: "",
            password_confirmation: "",
        },
    });
    const { resetPassword } = useAuth();
    const searchParams = useSearchParams();
    const url = searchParams.get("token");
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <AuthForm
                title="Forgot Password"
                description=""
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <FormControl>
                                <IconInput
                                    id="password"
                                    label="Password"
                                    type="password"
                                    {...form.register("password")}
                                />
                            </FormControl>
                            <FormControl>
                                <IconInput
                                    id="password_confirmation"
                                    label="Confirm Password"
                                    type="password"
                                    {...form.register("password_confirmation")}
                                />
                            </FormControl>
                        </CardContent>
                        <AuthFooter
                            isLoading={form.formState.isLoading}
                            buttonText="Send Email"
                            redirectText="Back to Login"
                            redirectLinkText="Login"
                            redirectHref={LOGIN_PAGE}
                        />
                    </form>
                </Form>
            </AuthForm>
        </div>
    );
}
