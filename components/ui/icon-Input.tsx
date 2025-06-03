"use client";

import React, { useMemo } from "react";
import { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string | React.ReactNode;
    icon?: LucideIcon;
    ref?: React.Ref<HTMLInputElement>;
}

export const IconInput = ({
    id,
    label,
    icon: Icon,
    type = "text",
    className = "",
    ref,
    ...props
}: IconInputProps) => {
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
        <div className="space-y-2">
            <Label htmlFor={id} className="font-medium text-sm ml-2" aria-label={id}>
                {label}
            </Label>
            <div className="relative">
                {iconElement}
                <Input
                    id={id}
                    ref={ref}
                    type={type}
                    className={`
                        block w-full rounded-full border 
                        ${Icon ? "pl-10" : "pl-4"} pr-4 
                        px-3 py-2 transition-shadow focus:shadow-outline 
                        ${className}
                    `}
                    {...props}
                />
            </div>
        </div>
    );
};