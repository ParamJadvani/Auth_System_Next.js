"use client";
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
import { resetPasswordSchema, ResetPasswordValues } from '@/lib/validations/auth';
import { useSearchParams } from 'next/navigation';


export default function PasswordResetPage() {
    const form = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            password_confirmation: "",
        },
    });
    const { errors, isLoading } = form.formState;
    const { resetPassword } = useAuth();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = async (data: ResetPasswordValues) => {
        if (token) {
            const response = await resetPassword(data, token);
            toastMessage({ response });
            form.reset();
        }
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
                                    id="password"
                                    label="Password"
                                    type="password"
                                    {...form.register("password")}
                                    error={errors.password?.message}
                                />
                            </FormControl>

                            <FormControl>
                                <IconInput
                                    id="password_confirmation"
                                    label="Confirm Password"
                                    type="password"
                                    {...form.register("password_confirmation")}
                                    error={errors.password_confirmation?.message}
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
