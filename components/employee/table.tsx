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
import { Pencil, Trash, ChevronUp, ChevronDown, UserCircle2Icon } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { SkeletonTable } from "@/components/ui/table/table-skeleton";
import { useQueryParams } from "@/hooks/use-query-params";
import { EmployeesResponse } from '@/types/employees';
import { toast } from 'react-toastify';

interface EmployeeTableProps {
    data: EmployeesResponse | null;
    loading: boolean;
    onDelete: (id: number) => Promise<void>;
    onCopyLoginLink: (id: number) => void;
}

export function EmployeeTable({ data, loading, onDelete, onCopyLoginLink }: EmployeeTableProps) {
    const { getParams, applyFilters } = useQueryParams();
    const sort_column = getParams("sort_column") || "employee_id";
    const sort_order = getParams("sort_order") || "desc";

    const columns = [
        { label: "Employee ID", key: "employee_id", sortable: true, width: "20%" },
        { label: "Name", key: "firstname", sortable: true, width: "20%" },
        { label: "Email", key: "email", sortable: true, width: "25%" },
        { label: "Salary", key: null, sortable: false, width: "12%" },
        { label: "Designation", key: null, sortable: false, width: "15%" },
        { label: "Joining Date", key: "date_of_joining", sortable: true, width: "15%" },
        { label: "Status", key: null, sortable: false, width: "8%" },
        { label: "Action", key: null, sortable: false, width: "12%" },
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
                <TableHeader className="bg-blue-950">
                    <TableRow className="hover:bg-blue-950">
                        {columns.map((col) => (
                            <TableHead
                                key={col.label}
                                className={`text-white whitespace-nowrap px-2 py-2 text-sm font-semibold ${col.sortable ? "cursor-pointer" : ""
                                    }`}
                                style={{ width: col.width }}
                            >
                                {col.sortable && col.key ? (
                                    <span
                                        onClick={() => handleSort(col.key!)}
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
                                    className="text-center px-2 py-2 text-sm font-medium text-gray-500"
                                >
                                    No data found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.data.map((emp, index) => (
                                <TableRow
                                    key={emp.id}
                                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } hover:bg-gray-100 transition-colors`}
                                >
                                    <TableCell className="px-4 py-2">
                                        {emp.employee_id}
                                    </TableCell>
                                    <TableCell className="px-4 py-2">
                                        {emp.firstname} {emp.lastname ?? ""}
                                    </TableCell>
                                    <TableCell className="px-4 py-2">{emp.email}</TableCell>
                                    <TableCell className="px-4 py-2">₹0.00</TableCell>
                                    <TableCell className="px-4 py-2">{emp.designation ?? "-"}</TableCell>
                                    <TableCell className="px-4 py-2">
                                        {format(new Date(emp.date_of_joining), "dd MMM yyyy")}
                                    </TableCell>
                                    <TableCell className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 text-xs rounded font-medium inline-block ${emp.status === "active"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {emp.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-2 text-center">
                                        <div className="flex justify-start items-center gap-3">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="hover:bg-red-50"
                                                aria-label="Copy Login Link"
                                                onClick={() => {
                                                    onCopyLoginLink(emp.id)
                                                    toast.success("Copied to clipboard");
                                                }}
                                            >
                                                <UserCircle2Icon className="w-4 h-4" />
                                            </Button>
                                            <Link
                                                href={`/employees/${emp.id}`}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Link>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="hover:bg-red-50"
                                                aria-label="Delete"
                                                onClick={() => onDelete(emp.id)}
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