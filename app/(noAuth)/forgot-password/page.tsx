"use client";
import { loginSchema, LoginValues } from "@/lib/validations/auth";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl } from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { IconInput } from "@/components/ui/iconInput";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { LOGIN_REDIRECT } from "@/constants/redirect";
import { toastMessage } from '@/utils/toastMessage';

export default function ForgotPasswordPage() {
    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { errors, isLoading } = form.formState;
    const { forgotPassword } = useAuth();

    const onSubmit = async (data: LoginValues) => {
        const response = await forgotPassword(data);
        toastMessage({ response });
        form.reset();
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                </CardHeader>
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
                                    error={errors.email?.message}
                                />
                            </FormControl>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 mt-5">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    "Forgot Password"
                                )}
                            </Button>
                            <p className="text-sm text-center text-muted-foreground">

                                <Link
                                    href={LOGIN_REDIRECT}
                                    className="text-primary hover:underline"
                                >
                                    Login
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
