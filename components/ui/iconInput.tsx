// components/ui/IconInput.tsx
"use client";

import React, { useMemo, useState } from "react";
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    icon?: LucideIcon;
    error?: string;
    ref?: React.Ref<HTMLInputElement>;
}

export const IconInput = ({
    id,
    label,
    icon: Icon,
    type = "text",
    error,
    className = "",
    ref,
    ...props
}: IconInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const iconElement = useMemo(
        () =>
            Icon ? (
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Icon size={20} />
                </div>
            ) : null,
        [Icon]
    );

    return (
        <div className="space-y-1">
            <Label htmlFor={id} className="font-medium text-sm text-gray-700">
                {label}
            </Label>
            <div className="relative">
                {iconElement}
                <Input
                    id={id}
                    ref={ref}
                    type={inputType}
                    className={`
            block w-full rounded-lg border 
            ${Icon ? "pl-10" : "pl-4"} ${isPassword ? "pr-10" : "pr-4"} 
            py-2 transition-shadow focus:shadow-outline 
            ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-indigo-500"} 
            ${className}
          `}
                    {...props}
                    aria-invalid={!!error}
                />
                {isPassword && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 transition-colors"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff className="w-4 h-4 text-gray-600" /> : <Eye className="w-4 h-4 text-gray-600" />}
                    </Button>
                )}
            </div>
            {error && (
                <FormMessage className="mt-1 text-sm text-red-600">
                    {error}
                </FormMessage>
            )}
        </div>
    );
};
