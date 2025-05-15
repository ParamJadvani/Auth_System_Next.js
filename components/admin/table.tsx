'use client'

import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Pencil, Trash } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'
import useAdmin from '@/hooks/use-Admin'
import { IAdminValues } from '@/types/admin'

interface AdminTableProps {
    data: IAdminValues[]
}

export function AdminTable({ data }: AdminTableProps) {
    const deleteAdmin = useAdmin().deleteAdmin;
    return (
        <div className="rounded-md border bg-white shadow-sm overflow-x-auto">
            <Table>
                <TableHeader className="bg-blue-950">
                    <TableRow className='hover:bg-blue-950'>
                        {["Name", "Email", "Salary", "Designation", "Joining Date", "Status", "Action"].map((label) => (
                            <TableHead key={label} className="text-white whitespace-nowrap px-4 py-2 text-sm font-semibold">
                                {label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((admin, index) => (
                        <TableRow
                            key={admin.id}
                            className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors`}
                        >
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
                                    className={`px-2 py-1 text-xs rounded font-medium inline-block
                                        ${admin.status === 'active'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                        }`}
                                >
                                    {admin.status}
                                </span>
                            </TableCell>
                            <TableCell className="px-4 py-2 text-center">
                                <div className="flex justify-start items-center gap-3">
                                    <Link href={`/admin/${admin.id}`} className="text-blue-600 hover:text-blue-800">
                                        <Pencil className="w-4 h-4" />
                                    </Link>
                                    <Button size="icon" variant="ghost" className="hover:bg-red-50" aria-label="Delete" onClick={async () => await deleteAdmin(admin.id)}>
                                        <Trash className="w-4 h-4 text-red-600" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
