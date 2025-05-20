"use client";

import { useForm } from "react-hook-form";
import { FormControl, Form } from "@/components/ui/form";
import { IconInput } from "@/components/ui/icon-Input";
import { CardContent } from "@/components/ui/card";
import useAuth from "@/hooks/use-Auth";
import { LOGIN_PAGE } from "@/constants/redirect";
import { IRegisterValues } from "@/types/auth";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthFooter } from "@/components/auth/AuthFooter";

export default function RegisterPage() {
    const form = useForm<IRegisterValues>({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    });

    const { register: registerAction } = useAuth();

    const onSubmit = async (data: IRegisterValues) => {
        await registerAction(data);
    };

    const personalFields: (keyof IRegisterValues)[] = ["firstname", "lastname"];

    const accountFields: {
        name: keyof IRegisterValues;
        type: string;
        label: string;
    }[] = [
            { name: "email", type: "email", label: "Email Address" },
            { name: "password", type: "password", label: "Password" },
            { name: "password_confirmation", type: "password", label: "Confirm Password" },
        ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <AuthForm
                title="Register"
                description="Create an account to access all features"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {personalFields.map((name) => (
                                    <FormControl key={name}>
                                        <IconInput
                                            id={name}
                                            label={name.charAt(0).toUpperCase() + name.slice(1)}
                                            {...form.register(name)}
                                        />
                                    </FormControl>
                                ))}
                            </div>

                            {accountFields.map(({ name, type, label }) => (
                                <FormControl key={name}>
                                    <IconInput
                                        id={name}
                                        label={label}
                                        type={type}
                                        {...form.register(name)}
                                    />
                                </FormControl>
                            ))}
                        </CardContent>
                        <AuthFooter
                            isLoading={form.formState.isSubmitting}
                            buttonText="Register"
                            redirectText="Already have an account?"
                            redirectLinkText="Login"
                            redirectHref={LOGIN_PAGE}
                        />
                    </form>
                </Form>
            </AuthForm>
        </div>
    );
}
