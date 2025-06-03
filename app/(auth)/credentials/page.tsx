import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CredentialsPage() {
    return <>
        <Link href="/credentials/add">
            <Button variant="link" className="px-4 py-2 border-blue-500 text-blue-500 hover:bg-blue-50 rounded-lg">
                Add Credentials
            </Button>
        </Link>
    </>
}