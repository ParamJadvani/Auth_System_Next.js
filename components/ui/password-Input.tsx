"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    error?: string;
    ref?: React.Ref<HTMLInputElement>;
}

export const PasswordInput = ({
    id,
    label,
    type = "password",
    error,
    className = "",
    ref,
    ...props
}: PasswordInputProps) => {

    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="font-medium text-sm ml-2">
                {label}
            </Label>
            <div className="relative">
                <Input
                    id={id}
                    ref={ref}
                    type={inputType}
                    className={`
                        block w-full rounded-full border 
                       "pr-10"
                        py-2 transition-shadow focus:shadow-outline 
                        ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-indigo-500"} 
                        ${className}
                    `}
                    {...props}
                    aria-invalid={!!error}
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 transition-colors hover:bg-transparent"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <EyeOff className="w-4 h-4 text-gray-600" /> : <Eye className="w-4 h-4 text-gray-600" />}
                </Button>
            </div>
            {error && (
                <FormMessage className="mt-1 text-sm text-red-600">
                    {error}
                </FormMessage>
            )}
        </div>
    );
};