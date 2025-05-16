'use client';

import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Pencil, Trash, ChevronUp, ChevronDown, UserCircle2Icon } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { EmployeesResponse } from '@/types/employees';
import { toast } from 'react-toastify';

interface EmployeeTableProps {
    data: EmployeesResponse | null;
    loading: boolean;
    onClick: (key: string, order: 'asc' | 'desc') => void;
    sort_column: string;
    sort_order: 'asc' | 'desc';
    deleteAdmin: (id: number) => void;
    copyLoginLink: (id: number) => void;
}

export function EmployeeTable({ data, loading, onClick, sort_column, sort_order, deleteAdmin, copyLoginLink }: EmployeeTableProps) {
    const columns = [
        { label: 'Employee ID', key: 'employee_id' },
        { label: 'Name', key: 'firstname' },
        { label: 'Email', key: 'email' },
        { label: 'Salary', key: null },
        { label: 'Designation', key: null },
        { label: 'Joining Date', key: 'date_of_joining' },
        { label: 'Status', key: null },
        { label: 'Action', key: null },
    ];


    return (
        <div className="rounded-md border bg-white shadow-sm overflow-x-auto">
            <Table>
                <TableHeader className="bg-blue-950">
                    <TableRow className="hover:bg-blue-950">
                        {columns.map((col) => (
                            <TableHead
                                key={col.label}
                                className={`text-white whitespace-nowrap px-4 py-2 text-sm font-semibold ${col.key ? 'cursor-pointer' : ''}`}
                            >
                                {col.key ? (
                                    <span
                                        onClick={() => onClick(col.key!, sort_order === 'desc' ? 'asc' : 'desc')}
                                        className="flex items-center gap-1"
                                    >
                                        {col.label}
                                        {sort_column === col.key &&
                                            (sort_order === 'asc' ? (
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
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-center px-4 py-2 text-sm font-medium"
                            >
                                Loading...
                            </TableCell>
                        </TableRow>
                    ) : !data?.data || data.data.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-center px-4 py-2 text-sm font-medium"
                            >
                                No data found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.data.map((admin, index) => (
                            <TableRow
                                key={admin.id}
                                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    } hover:bg-gray-100 transition-colors`}
                            >
                                <TableCell className="px-4 py-2">{admin.employee_id}</TableCell>
                                <TableCell className="px-4 py-2">
                                    {admin.firstname} {admin.lastname ?? ''}
                                </TableCell>
                                <TableCell className="px-4 py-2">{admin.email}</TableCell>
                                <TableCell className="px-4 py-2">₹0.00</TableCell>
                                <TableCell className="px-4 py-2">{admin.designation ?? '-'}</TableCell>
                                <TableCell className="px-4 py-2">
                                    {format(new Date(admin.date_of_joining), 'dd MMM yyyy')}
                                </TableCell>
                                <TableCell className="px-4 py-2">
                                    <span
                                        className={`px-2 py-1 text-xs rounded font-medium inline-block ${admin.status === 'active'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-red-100 text-red-700'
                                            }`}
                                    >
                                        {admin.status}
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
                                                copyLoginLink(admin.id)
                                                toast.success("Copied to clipboard");
                                            }}
                                        >
                                            <UserCircle2Icon className="w-4 h-4" />
                                        </Button>
                                        <Link href={`/employees/${admin.id}`} className="text-blue-600 hover:text-blue-800">
                                            <Pencil className="w-4 h-4" />
                                        </Link>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="hover:bg-red-50"
                                            aria-label="Delete"
                                            onClick={() => deleteAdmin(admin.id)}
                                        >
                                            <Trash className="w-4 h-4 text-red-600" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
