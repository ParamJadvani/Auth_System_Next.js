"use client";
import LoginForm from '@/app/(noAuth)/login/_LoginForm';
import { Suspense } from 'react';

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}