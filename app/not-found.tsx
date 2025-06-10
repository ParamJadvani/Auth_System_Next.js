"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 px-6 text-center">
            <div className="max-w-md space-y-6">
                <div className="flex items-center justify-center">
                    <Ghost className="w-16 h-16 text-blue-600 animate-pulse" />
                </div>

                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="text-xl font-semibold text-gray-700">
                    Whoops! The page you’re looking for doesn’t exist.
                </p>
                <p className="text-sm text-gray-500">
                    It might have been removed, renamed, or it never existed in the first place.
                </p>

                <Link href="/">
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition duration-200">
                        ⬅ Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
