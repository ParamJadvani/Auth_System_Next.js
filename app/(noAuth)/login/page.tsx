"use client";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormControl } from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { IconInput } from "@/components/ui/iconInput";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import useAuth from "@/hooks/use-Auth";
import { FORGOT_PASSWORD_PAGE, REGISTER_PAGE } from "@/constants/redirect";
import { ILoginValues } from '@/types/auth';

export default function LoginPage() {
    const form = useForm<ILoginValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { isLoading } = form.formState;
    const { login: loginAction } = useAuth();

    const onSubmit = async (data: ILoginValues) => {
        await loginAction(data);
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Sign in to your account</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <FormControl>
                                <IconInput
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    {...form.register("email")}
                                />
                            </FormControl>

                            <FormControl>
                                <IconInput
                                    id="password"
                                    label="Password"
                                    type="password"
                                    {...form.register("password")}
                                />
                            </FormControl>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 mt-6">
                            {/* Forgot Password */}
                            <div className="w-full text-sm text-end">
                                <Link
                                    href={FORGOT_PASSWORD_PAGE}
                                    className="text-blue-700 font-normal hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Login Button */}
                            <Button type="submit" className="w-full h-10 text-sm" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </Button>

                            {/* Register Link */}
                            <div className="w-full text-sm text-center text-muted-foreground">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href={REGISTER_PAGE}
                                    className="text-primary font-medium hover:underline"
                                >
                                    Register
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}