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

const fields: {
    id: "email" | "password";
    name: "email" | "password";
    label: string;
    type: "email" | "password";
    required: boolean;
}[] = [
        {
            id: "email",
            name: "email",
            label: "Email Address",
            type: "email",
            required: true,
        },
        {
            id: "password",
            name: "password",
            label: "Password",
            type: "password",
            required: true,
        },
    ];


export default function LoginForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const form = useForm<ILoginValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { login: loginAction } = useAuth();

    const onSubmit = async (data: ILoginValues) => {
        await loginAction(data);
    };

    useEffect(() => {
        if (!token) return;
        (async () => {
            await loginAction(undefined, token);
        })();
    }, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <AuthForm
                title="Login"
                description="Sign in to your account"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            {fields.map(({ id, name, label, type, required }) => (
                                <FormControl key={id} className="space-y-1">
                                    <IconInput
                                        id={id}
                                        label={label}
                                        type={type}
                                        required={required}
                                        {...form.register(name)}
                                    />
                                </FormControl>
                            ))}
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
    );
}