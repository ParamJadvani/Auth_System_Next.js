"use client";

import React from "react";
import {
    Card,
    CardDescription,
    // CardFooter
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
interface AuthFormProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export function AuthForm({
    title,
    description,
    children,
}: AuthFormProps) {
    return (
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            {children}
            {/* {footerLinks && (
                <CardFooter className="flex justify-center space-x-4">
                    {footerLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            {link.text}
                        </Link>
                    ))}
                </CardFooter>
            )} */}
        </Card>
    );
}
