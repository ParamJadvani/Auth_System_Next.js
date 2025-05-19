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
        </Card>
    );
}
