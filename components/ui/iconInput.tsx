// components/ui/iconInput.tsx
"use client";

import React, { forwardRef, useMemo, useState } from "react";
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
}

export const IconInput = forwardRef<HTMLInputElement, IconInputProps>(
    (
        { id, label, icon: Icon, type = "text", error, className = "", ...props },
        ref // 2️⃣ ref now refers to the <Input> element
    ) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === "password";
        const inputType = isPassword && showPassword ? "text" : type;

        const iconElement = useMemo(
            () =>
                Icon ? <Icon size={18} className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" /> : null,
            [Icon]
        );

        return (
            <div className="space-y-2">
                <Label htmlFor={id}>{label}</Label>
                <div className="relative">
                    {iconElement}
                    {/* 3️⃣ Attach the forwarded ref here */}
                    <Input
                        id={id}
                        type={inputType}
                        ref={ref}
                        className={`
                            ${Icon ? "pl-10" : ""}
                            ${isPassword ? "pr-10" : ""}
                            ${error ? "border-destructive" : "focus:border-primary"}
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
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </Button>
                    )}
                </div>
                {error && <FormMessage>{error}</FormMessage>}
            </div>
        );
    }
);

IconInput.displayName = "IconInput";
