"use client";
import { useForm } from "react-hook-form";
import { FormControl } from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { IconInput } from "@/components/ui/icon-Input";
import { CardContent } from "@/components/ui/card";
import useAuth from "@/hooks/use-Auth";
import { LOGIN_PAGE } from "@/constants/redirect";
import { ILoginValues } from '@/types/auth';
import { AuthForm } from '@/components/auth/AuthForm';
import { AuthFooter } from '@/components/auth/AuthFooter';

export default function ForgotPasswordPage() {
    const form = useForm<ILoginValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { forgotPassword } = useAuth();

    const onSubmit = async (data: ILoginValues) => {
        await forgotPassword(data);
        form.reset();
    };
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
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    placeholder='Enter your email'
                                    {...form.register("email")}
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