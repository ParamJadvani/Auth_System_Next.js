"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { CredentialResponse } from "@/types/credentials";
import useCredentials from "@/hooks/use-Credentials";
import authStore from "@/store/authStore";

import {
    Share2,
    Pencil,
    Trash2
} from "lucide-react"; // Icons for action buttons

export default function CredentialsPage() {
    const [data, setData] = useState<CredentialResponse | undefined>(undefined);
    const { getCredentials } = useCredentials();
    const userStore = authStore((s) => s.user);

    useEffect(() => {
        if (userStore?.user?.id) {
            getCredentials(userStore.user.id).then(setData);
        }
    }, [userStore?.user?.id]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Credentials</h1>
                <AddCredentialsButton />
            </div>

            <div className="border rounded-lg overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Website URL</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Password</TableHead>
                            <TableHead>Created Date</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.map((credential) => (
                            <TableRow key={credential.id}>
                                <TableCell>{credential.name}</TableCell>
                                <TableCell className="whitespace-pre-wrap">
                                    <Link href={`${credential.website[0]}`} target="_blank" rel="noopener noreferrer">
                                        {credential.website.length > 0
                                            ? credential.website[0]
                                            : "-"}</Link>
                                </TableCell>
                                <TableCell>{credential.username}</TableCell>
                                <TableCell>{credential.pass}</TableCell>
                                <TableCell>
                                    {format(new Date(credential.created_at), "yyyy-MM-dd")}
                                </TableCell>
                                <TableCell className="flex items-center gap-2 justify-center">
                                    <Button size="icon" variant="ghost">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost">
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost">
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function AddCredentialsButton() {
    return (
        <Link href="/credentials/add">
            <Button
                variant="link"
                className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-50 rounded-lg"
            >
                Add Credentials
            </Button>
        </Link>
    );
}
