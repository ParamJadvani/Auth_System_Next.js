"use client";

import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { useQueryParams } from "@/hooks/use-query-params";
import { TableSort } from "@/components/ui/table/table-sort";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { formateDate } from "@/lib/utils";
import { TagDialogForm } from "@/components/tags/dialog-form";
import { useState } from "react";
import { SkeletonTable } from '@/components/ui/table/table-skeleton';

interface Column {
    label: string;
    key: string | null;
    width: string;
}

interface TableDisplayProps {
    data: {
        data: Array<{
            id: number;
            name: string;
            userCredentials?: any[];
            created_at: string;
        }>;
    };
    onDelete: (id: number) => void;
    onEdit: (values: Record<string, string>, editId: number | undefined) => void;
    loading: boolean;
}

export function TagTableDisplay({ data, onDelete, onEdit, loading }: TableDisplayProps) {
    const { getParams, applyFilters } = useQueryParams();
    const sort_column = getParams("sort_column") || "employee_id";
    const sort_order = getParams("sort_order") || "desc";

    const [editingTagId, setEditingTagId] = useState<number | null>(null);

    const columns: Column[] = [
        { label: "Name", key: "name", width: "25%" },
        { label: "User Credentials", key: null, width: "25%" },
        { label: "Created At", key: "created_at", width: "25%" },
        { label: "Action", key: null, width: "25%" },
    ];

    const handleSort = (key: string) => {
        applyFilters({
            sort_column: key,
            sort_order: sort_column === key && sort_order === "asc" ? "desc" : "asc",
        });
    };

    return (
        <div className="rounded-md border bg-white shadow-sm overflow-x-auto">
            <Table className="table-fixed w-full">
                <TableHeader className="bg-blue-900">
                    <TableRow className="hover:bg-blue-800">
                        {columns.map((col) => (
                            <TableSort
                                key={col.label}
                                label={col.label}
                                width={col.width}
                                sort_column={sort_column}
                                sort_order={sort_order as "asc" | "desc"}
                                handleSort={handleSort}
                                col_key={col.key}
                            />
                        ))}
                    </TableRow>
                </TableHeader>

                {loading ? (
                    <SkeletonTable rows={5} columns={columns} />
                ) : (
                    <TableBody>
                        {data?.data?.map((obj, index) => {
                            const isEven = index % 2 === 0;
                            const rowBg = isEven ? "bg-gray-50" : "bg-white";
                            const hasCredentials = Array.isArray(obj.userCredentials) && obj.userCredentials.length > 0;

                            return (
                                <TableRow
                                    key={obj.id}
                                    className={`${rowBg} hover:bg-gray-100 transition-colors`}
                                >
                                    {/* Tag Name */}
                                    <TableCell className="px-4 py-3 font-medium">
                                        {obj.name}
                                    </TableCell>

                                    {/* Number of User Credentials (as a pill) */}
                                    <TableCell className="px-4 py-3">
                                        {hasCredentials ? (
                                            <span className="inline-block bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded-full">
                                                {obj.userCredentials!.length}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">–</span>
                                        )}
                                    </TableCell>

                                    {/* Created At (formatted) */}
                                    <TableCell className="px-4 py-3">
                                        {formateDate(obj.created_at)}
                                    </TableCell>

                                    {/* Actions */}
                                    <TableCell className="px-4 py-3 text-center">
                                        <div className="flex justify-center items-center gap-4">
                                            {/* Edit Dialog */}
                                            <Dialog
                                                open={editingTagId === obj.id}
                                                onOpenChange={(open) => {
                                                    if (!open) {
                                                        setEditingTagId(null);
                                                    }
                                                }}
                                            >
                                                <DialogTrigger asChild>
                                                    <button
                                                        onClick={() => setEditingTagId(obj.id)}
                                                        className="p-1 hover:bg-gray-200 rounded"
                                                        aria-label="Edit Tag"
                                                    >
                                                        <Pencil className="w-4 h-4 text-gray-700" />
                                                    </button>
                                                </DialogTrigger>

                                                <TagDialogForm
                                                    data={obj.name}
                                                    editing={obj.id}
                                                    onClose={() => setEditingTagId(null)}
                                                    onSubmit={onEdit}
                                                />
                                            </Dialog>

                                            {/* Delete Confirmation */}
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button
                                                        className="p-1 hover:bg-gray-200 rounded"
                                                        aria-label="Delete Tag"
                                                    >
                                                        <Trash className="w-4 h-4 text-red-600" />
                                                    </button>
                                                </DialogTrigger>

                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Delete Tag?</DialogTitle>
                                                        <DialogDescription>
                                                            Are you sure you want to permanently delete the tag “
                                                            <span className="font-semibold">{obj.name}</span>”? This
                                                            action cannot be undone.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter className="space-x-2">
                                                        <DialogClose asChild>
                                                            <button className="px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded">
                                                                Cancel
                                                            </button>
                                                        </DialogClose>
                                                        <DialogClose asChild>
                                                            <button
                                                                onClick={() => onDelete(obj.id)}
                                                                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
                                                            >
                                                                Yes, Delete
                                                            </button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                )}


            </Table>
        </div>
    );
}
