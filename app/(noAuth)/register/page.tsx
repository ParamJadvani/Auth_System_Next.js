"use client";
import { registerSchema, RegisterValues } from "@/lib/validations/auth";
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
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { LOGIN_PAGE } from "@/constants/redirect";

export default function RegisterPage() {
    const form = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    });
    const { errors, isLoading } = form.formState;
    const { register: registerAction } = useAuth();

    const onSubmit = async (data: RegisterValues) => {
        await registerAction(data);
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Create your account</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormControl>
                                    <IconInput
                                        id="firstname"
                                        label="First Name"
                                        {...form.register("firstname")}
                                    />
                                </FormControl>

                                <FormControl>
                                    <IconInput
                                        id="lastname"
                                        label="Last Name"
                                        {...form.register("lastname")}
                                    />
                                </FormControl>
                            </div>
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
                                    "Register"
                                )}
                            </Button>
                            <p className="text-sm text-center text-muted-foreground">
                                Already have an account?{" "}
                                <Link
                                    href={LOGIN_PAGE}
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
