import Link from 'next/link';

export default function LeavesPage() {
    return (
        <div>
            <Link href={"/leaves/add"}>
                Leaves Page</Link>
        </div>
    );
}