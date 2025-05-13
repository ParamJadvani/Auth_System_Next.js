import PasswordResetComponent from '@/app/(noAuth)/password/reset/_passwordResetPage';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default function PasswordResetPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
            </div>
        </div>}>
            <PasswordResetComponent />
        </ Suspense>
    )
}