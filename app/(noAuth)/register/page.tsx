"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl } from "@/components/ui/form";
import { IconInput } from "@/components/ui/icon-Input";
import { PasswordInput } from "@/components/ui/password-Input";
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-4">
            <AuthForm
                title="Create Your Account"
                description="Join us to unlock all features"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-6 p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormControl>
                                    <IconInput
                                        id="firstname"
                                        label="First Name"
                                        placeholder="Enter your first name"
                                        {...form.register("firstname")}
                                    />
                                </FormControl>
                                <FormControl>
                                    <IconInput
                                        id="lastname"
                                        label="Last Name"
                                        placeholder="Enter your last name"
                                        {...form.register("lastname")}
                                    />
                                </FormControl>
                            </div>
                            <FormControl>
                                <IconInput
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    placeholder="Enter your email"
                                    {...form.register("email")}
                                />
                            </FormControl>
                            <FormControl>
                                <PasswordInput
                                    id="password"
                                    label="Password"
                                    placeholder="Enter your password"
                                    {...form.register("password")}
                                />
                            </FormControl>
                            <FormControl>
                                <PasswordInput
                                    id="password_confirmation"
                                    label="Confirm Password"
                                    placeholder="Confirm your password"
                                    {...form.register("password_confirmation")}
                                />
                            </FormControl>
                        </CardContent>
                        <AuthFooter
                            isLoading={form.formState.isSubmitting}
                            buttonText="Create Account"
                            redirectText="Already have an account?"
                            redirectLinkText="Sign In"
                            redirectHref={LOGIN_PAGE}
                        />
                    </form>
                </Form>
            </AuthForm>
        </div>
    );
}