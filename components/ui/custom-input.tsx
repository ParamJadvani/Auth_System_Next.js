"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

type Option = { label: string; value: string } | string;

interface CustomInputProps
    extends React.InputHTMLAttributes<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    > {
    id: string;
    label?: React.ReactNode;
    className?: string;
    text?: boolean;
    password?: boolean;
    textarea?: boolean;
    select?: boolean;
    radio?: boolean;
    options?: Option[];
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
    id,
    label,
    className = "",
    text = false,
    password = false,
    textarea = false,
    select = false,
    radio = false,
    options = [],
    value = undefined,
    onValueChange = undefined,
    placeholder = undefined,
    ...inputProps
}) => {
    const controlType = text
        ? "text"
        : password
            ? "password"
            : textarea
                ? "textarea"
                : select
                    ? "select"
                    : radio
                        ? "radio"
                        : "text";

    const [showPassword, setShowPassword] = useState(false);

    const normalizedOptions = options.map((opt) =>
        typeof opt === "string" ? { label: opt, value: opt } : opt
    );

    const renderControl = () => {
        switch (controlType) {
            case "text":
                return (
                    <Input
                        id={id}
                        className={`w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 ${className}`}
                        value={value}
                        onChange={(e) => onValueChange?.(e.target.value)}
                        placeholder={placeholder}
                        {...inputProps}
                    />
                );
            case "password":
                return (
                    <div className="relative">
                        <Input
                            id={id}
                            type={showPassword ? "text" : "password"}
                            className={`w-full pr-10 px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 ${className}`}
                            value={value}
                            onChange={(e) => onValueChange?.(e.target.value)}
                            placeholder={placeholder}
                            {...inputProps}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:bg-transparent"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                );
            case "textarea":
                return (
                    <Textarea
                        id={id}
                        className={`w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 ${className}`}
                        value={value}
                        onChange={(e) => onValueChange?.(e.target.value)}
                        placeholder={placeholder}
                        {...inputProps}
                    />
                );
            case "select":
                return (
                    <Select
                        value={value}
                        onValueChange={onValueChange}
                        aria-label={label?.toString()}
                    >
                        <SelectTrigger
                            id={id}
                            className={`w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 ${className}`}
                        >
                            <SelectValue placeholder={placeholder || "Select…"} />
                        </SelectTrigger>
                        <SelectContent>
                            {normalizedOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            case "radio":
                return (
                    <RadioGroup
                        value={value}
                        onValueChange={onValueChange}
                        className="flex flex-wrap gap-4 mt-2"
                    >
                        {normalizedOptions.map((opt) => (
                            <div key={opt.value} className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value={opt.value}
                                    id={`${id}-${opt.value}`}
                                    className="border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <Label
                                    htmlFor={`${id}-${opt.value}`}
                                    className="text-sm capitalize"
                                >
                                    {opt.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                );
            default:
                return (
                    <Input
                        id={id}
                        className={`w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 ${className}`}
                        value={value}
                        onChange={(e) => onValueChange?.(e.target.value)}
                        placeholder={placeholder}
                        {...inputProps}
                    />
                );
        }
    };

    return (
        <div className="space-y-1">
            {label && (
                <Label htmlFor={id} className="font-medium text-sm text-gray-700">
                    {label}
                </Label>
            )}
            {renderControl()}
        </div>
    );
};
