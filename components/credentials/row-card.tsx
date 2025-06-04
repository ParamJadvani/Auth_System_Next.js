"use client"
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { formateDate } from '@/lib/utils';
import { CredentialData } from '@/types/credentials';
import { CopyIcon, Eye, EyeOff, Pencil, Share2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function CredentialRow({ credential, onDelete, shareLoginURL }: { credential: CredentialData, onDelete: (id: number) => void, shareLoginURL: (id: number) => void }) {
    const [showPassword, setShowPassword] = useState(false);

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Copied to clipboard");
        } catch {
        }
    };

    const firstWebsite = credential.website.length > 0 ? credential.website[0] : null;

    return (
        <TableRow>
            <TableCell className="w-[20%]">
                <div className="flex items-center gap-2">
                    <span>{credential.name}</span>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => copyToClipboard(credential.name)}
                    >
                        <CopyIcon className="w-4 h-4" />
                    </Button>
                </div>
            </TableCell>

            <TableCell className="w-[20%]">
                {firstWebsite ? (
                    <div className="flex items-center gap-2 max-w-[200px]">
                        <Link
                            href={firstWebsite}
                            target="_blank"
                            className="truncate hover:text-blue-600 underline"
                            title={firstWebsite} // Tooltip on hover
                        >
                            {firstWebsite}
                        </Link>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => copyToClipboard(firstWebsite)}
                            className="shrink-0"
                        >
                            <CopyIcon className="w-4 h-4" />
                        </Button>
                    </div>
                ) : (
                    <span>-</span>
                )}
            </TableCell>



            <TableCell>
                <div className="flex items-center gap-2">
                    <span>{credential.username}</span>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => copyToClipboard(credential.username)}
                    >
                        <CopyIcon className="w-4 h-4" />
                    </Button>
                </div>
            </TableCell>


            <TableCell>
                <div className="flex items-center gap-2">
                    <span className="font-mono">
                        {showPassword ? credential.pass : "••••••••"}
                    </span>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                        ) : (
                            <Eye className="w-4 h-4" />
                        )}
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => copyToClipboard(credential.pass)}
                    >
                        <CopyIcon className="w-4 h-4" />
                    </Button>
                </div>
            </TableCell>

            <TableCell>
                {formateDate(credential.created_at)}
            </TableCell>


            <TableCell className="flex items-center gap-2 justify-center">
                <Button size="icon" variant="ghost" onClick={() => shareLoginURL(credential.id)}>
                    <Share2 className="w-4 h-4" />
                </Button>
                <Link href={`/credentials/${credential.id}`}>
                    <Button size="icon" variant="ghost">
                        <Pencil className="w-4 h-4" />
                    </Button>
                </Link>
                <Dialog>
                    <DialogTrigger>
                        <Trash2 className="w-4 h-4 text-red-600" />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose className='rounded-xs border-0 shadow-none'>
                                Cancel
                            </DialogClose>
                            <DialogClose onClick={() => onDelete(credential.id)} className='bg-red-500 rounded-md p-2 text-white hover:bg-red-600'>
                                Yes, Delete
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>
    );
}