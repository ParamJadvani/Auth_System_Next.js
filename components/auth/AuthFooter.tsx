"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

interface AuthFooterProps {
    isLoading?: boolean;
    buttonText: string;
    redirectText: string;
    redirectLinkText: string;
    redirectHref: string;
    forgotPasswordHref?: string;
}

export function AuthFooter({
    isLoading = false,
    buttonText,
    redirectText,
    redirectLinkText,
    redirectHref,
    forgotPasswordHref,
}: AuthFooterProps) {
    return (
        <CardFooter className="flex flex-col items-center gap-5 mt-6">
            {forgotPasswordHref && (
                <div className="w-full text-right">
                    <Link
                        href={forgotPasswordHref}
                        className="text-sm font-medium text-blue-600 hover:underline"
                    >
                        Forgot your password?
                    </Link>
                </div>
            )}

            <Button
                type="submit"
                className="w-full h-10 text-sm font-semibold"
                disabled={isLoading}
                loading={isLoading}
            >
                {buttonText}{" "}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
                {redirectText}{" "}
                <Link
                    href={redirectHref}
                    className="text-blue-600 font-medium hover:underline"
                >
                    {redirectLinkText}
                </Link>
            </p>
        </CardFooter>
    );
}
