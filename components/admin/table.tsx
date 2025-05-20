"use client";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil, Trash, ChevronUp, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { AdminsResponse } from "@/types/admin";
import { SkeletonTable } from "@/components/ui/table-skeleton";

interface AdminTableProps {
    data: AdminsResponse | null;
    loading: boolean;
    onSort: (key: string, order: "asc" | "desc") => void;
    sort_column: string;
    sort_order: "asc" | "desc" | string;
    onDelete: (id: number) => Promise<void>;
}

export function AdminTable({ data, loading, onSort, sort_column, sort_order, onDelete }: AdminTableProps) {
    const columns = [
        { label: "Name", key: "firstname", sortable: true, width: "20%" },
        { label: "Email", key: "email", sortable: true, width: "25%" },
        { label: "Salary", key: null, sortable: false, width: "10%" },
        { label: "Designation", key: null, sortable: false, width: "15%" },
        { label: "Joining Date", key: "date_of_joining", sortable: true, width: "15%" },
        { label: "Status", key: null, sortable: false, width: "10%" },
        { label: "Action", key: null, sortable: false, width: "15%" },
    ];

    return (
        <div className="rounded-md border bg-white shadow-sm overflow-x-auto">
            <Table className="table-fixed w-full">
                <TableHeader className="bg-blue-950">
                    <TableRow className="hover:bg-blue-950">
                        {columns.map((col) => (
                            <TableHead
                                key={col.label}
                                className={`text-white whitespace-nowrap px-4 py-2 text-sm font-semibold ${col.sortable ? "cursor-pointer" : ""
                                    }`}
                                style={{ width: col.width }}
                            >
                                {col.sortable && col.key ? (
                                    <span
                                        onClick={() =>
                                            onSort(col.key!, sort_order === "asc" ? "desc" : "asc")
                                        }
                                        className="flex items-center gap-1"
                                    >
                                        {col.label}
                                        {sort_column === col.key &&
                                            (sort_order === "asc" ? (
                                                <ChevronUp className="w-4 h-4" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4" />
                                            ))}
                                    </span>
                                ) : (
                                    col.label
                                )}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                {loading ? (
                    <SkeletonTable rows={5} columns={columns} />
                ) : (
                    <TableBody>
                        {!data?.data || data.data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="text-center px-4 py-2 text-sm font-medium text-gray-500"
                                >
                                    No data found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.data.map((admin, index) => (
                                <TableRow
                                    key={admin.id}
                                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } hover:bg-gray-100 transition-colors`}
                                >
                                    <TableCell className="px-4 py-2">
                                        {admin.firstname} {admin.lastname ?? ""}
                                    </TableCell>
                                    <TableCell className="px-4 py-2">{admin.email}</TableCell>
                                    <TableCell className="px-4 py-2">₹0.00</TableCell>
                                    <TableCell className="px-4 py-2">{admin.designation ?? "-"}</TableCell>
                                    <TableCell className="px-4 py-2">
                                        {format(new Date(admin.date_of_joining), "dd MMM yyyy")}
                                    </TableCell>
                                    <TableCell className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 text-xs rounded font-medium inline-block ${admin.status === "active"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {admin.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-2 text-center">
                                        <div className="flex justify-start items-center gap-3">
                                            <Link
                                                href={`/admin/${admin.id}`}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Link>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="hover:bg-red-50"
                                                aria-label="Delete"
                                                onClick={() => onDelete(admin.id)}
                                            >
                                                <Trash className="w-4 h-4 text-red-600" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                )}
            </Table>
        </div>
    );
}