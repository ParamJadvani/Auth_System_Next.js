"use client";

import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { IChangePasswordValues } from "@/types/auth";
import { PasswordInput } from '@/components/ui/password-Input';

export function ChangePasswordDialog({
    onSubmit,
}: {
    onSubmit: (data: IChangePasswordValues) => void;
}) {
    const form = useForm<IChangePasswordValues>({
        defaultValues: {
            current_password: "",
            new_password: "",
            new_password_confirmation: "",
        },
    });
    const {
        register,
        handleSubmit,
    } = form;

    const submitHandler = useCallback(
        (data: IChangePasswordValues) => onSubmit(data),
        [onSubmit]
    );

    return (
        <DialogContent className="max-w-md">
            <Card className="shadow-none border-0">
                <CardHeader className="space-y-2">
                    <DialogTitle className="text-2xl font-semibold">
                        Change Password
                    </DialogTitle>
                    <Separator />
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <CardContent className="space-y-6">
                            {[
                                { id: "current_password", label: "Current Password" },
                                { id: "new_password", label: "New Password" },
                                {
                                    id: "new_password_confirmation",
                                    label: "Confirm New Password",
                                },
                            ].map(({ id, label }) => (
                                <FormControl key={id}>
                                    <PasswordInput
                                        id={id}
                                        label={label}
                                        type="password"
                                        placeholder={label}
                                        {...register(id as keyof IChangePasswordValues)}
                                    />
                                </FormControl>
                            ))}
                        </CardContent>

                        <CardFooter className="flex justify-end space-x-3">
                            <DialogClose asChild>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={form.formState.isSubmitting} loading={form.formState.isSubmitting}>
                                Save
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </DialogContent>
    );
}
