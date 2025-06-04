"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash, UserCircle2Icon } from "lucide-react";
import Link from "next/link";
import { SkeletonTable } from "@/components/ui/table/table-skeleton";
import { useQueryParams } from "@/hooks/use-query-params";
import { toast } from "react-toastify";
import { AdminsResponse } from "@/types/admin";
import { EmployeesResponse } from "@/types/employees";
import { TableNotFound } from "@/components/ui/table/table-notFound";
import { TableSort } from '@/components/ui/table/table-sort';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { formateDate } from '@/lib/utils';


interface Column {
    label: string;
    key: string | null;
    width: string;
}

interface TableDisplayProps {
    data: EmployeesResponse | AdminsResponse | null;
    loading: boolean;
    admin?: boolean;
    onDelete: (id: number) => void;
    onCopyLoginLink?: (id: number) => void;
}

export function TableDisplay({ data, loading, admin = true, onDelete, onCopyLoginLink }: TableDisplayProps) {
    const { getParams, applyFilters } = useQueryParams();
    const sort_column = getParams("sort_column") || "employee_id";
    const sort_order = getParams("sort_order") || "desc";

    const columns: Column[] = [
        ...(admin ? [] : [{ label: "Employee ID", key: "employee_id", width: "15%" }]),
        { label: "Name", key: "firstname", width: admin ? "22%" : "18%" },
        { label: "Email", key: "email", width: admin ? "25%" : "22%" },
        { label: "Salary", key: null, width: "12%" },
        { label: "Designation", key: null, width: "15%" },
        { label: "Joining Date", key: "date_of_joining", width: admin ? "14%" : "13%" },
        { label: "Status", key: null, width: "8%" },
        { label: "Action", key: null, width: admin ? "10%" : "12%" },
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
                ) : !data?.data || data.data.length === 0 ? (
                    <TableNotFound colSpan={columns.length} />
                ) : (
                    <TableBody>
                        {data.data.map((obj, index) => (
                            <TableRow
                                key={obj.id}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors`}
                            >
                                {!admin && <TableCell className="px-4 py-2">{obj.employee_id ?? "-"}</TableCell>}
                                <TableCell className="px-4 py-2">
                                    {obj.firstname} {obj.lastname ?? ""}
                                </TableCell>
                                <TableCell className="px-4 py-2">{obj.email}</TableCell>
                                <TableCell className="px-4 py-2">₹0.00</TableCell>
                                <TableCell className="px-4 py-2">{obj.designation ?? "-"}</TableCell>
                                <TableCell className="px-4 py-2">
                                    {/* {format(new Date(obj.date_of_joining), "dd MMM yyyy")} */}
                                    {formateDate(obj.date_of_joining)}
                                </TableCell>
                                <TableCell className="px-4 py-2">
                                    <span
                                        className={`px-2 py-1 text-xs rounded font-medium inline-block ${obj.status === "active"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {obj.status}
                                    </span>
                                </TableCell>
                                <TableCell className="px-4 py-2 text-center">
                                    <div className="flex justify-start items-center gap-3">
                                        {!admin && onCopyLoginLink && (
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="hover:bg-blue-50"
                                                aria-label="Copy Login Link"
                                                onClick={() => {
                                                    onCopyLoginLink(obj.id);
                                                    toast.success("Copied to clipboard");
                                                }}
                                            >
                                                <UserCircle2Icon className="w-4 h-4 text-blue-600" />
                                            </Button>
                                        )}
                                        <Link
                                            href={`/${admin ? "admin" : "employees"}/${obj.id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Link>

                                        <Dialog>
                                            <DialogTrigger>
                                                <Trash className="w-4 h-4 text-red-600" />
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
                                                    <DialogClose onClick={() => onDelete(obj.id)} className='bg-red-500 rounded-md p-2 text-white hover:bg-red-600'>
                                                        Yes, Delete
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>


                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                )}
            </Table>
        </div>
    );
}
