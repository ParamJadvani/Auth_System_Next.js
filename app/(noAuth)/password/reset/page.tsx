import PasswordResetComponent from '@/app/(noAuth)/password/reset/_passwordResetPage';
import Loading from '@/app/loading';
import { Suspense } from 'react';

export default function PasswordResetPage() {
    return (
        <Suspense fallback={<Loading />}>
            <PasswordResetComponent />
        </ Suspense>
    )
}