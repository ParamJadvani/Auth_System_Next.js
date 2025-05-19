"use client";
import LoginForm from '@/app/(noAuth)/login/_LoginForm';
import Loading from '@/app/loading';
import { Suspense } from 'react';

export default function LoginPage() {
    return (
        <Suspense fallback={<Loading />}>
            <LoginForm />
        </Suspense>
    )
}