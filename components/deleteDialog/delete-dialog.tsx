"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DeleteDialog({ id, onDelete }: { id: number, onDelete: (id: number) => void }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 hover:bg-red-100 rounded-full transition-colors duration-200"
                    aria-label="Open delete dialog"
                >
                    <Trash2Icon className="w-5 h-5 text-red-600 hover:text-red-700" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md w-full rounded-lg p-6 shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-gray-900">
                        Are you sure?
                    </DialogTitle>
                    <DialogDescription className="mt-2 text-gray-600 text-base font-medium">
                        This action cannot be undone. Deleting this account will permanently remove all associated data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            className="rounded-md border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            onClick={() => onDelete(id)}
                            className="rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                        >
                            Yes, Delete
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}