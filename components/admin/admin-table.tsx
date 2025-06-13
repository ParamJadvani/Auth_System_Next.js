"use client";

import { DRYTable } from '@/components/DRY-Table/dry-table';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { cn, formateDate } from '@/lib/utils';
import { AdminsResponse, IAdminValues } from '@/types/admin';
import { DeleteDialog } from '@/components/deleteDialog/delete-dialog';
import { Card } from '@/components/ui/card';

interface AdminTableProps {
    data: AdminsResponse | null;
    loading: boolean;
    onDelete: (id: number) => void;
}

export function AdminTable({ data, loading, onDelete }: AdminTableProps) {
    return (
        <Card className="bg-white rounded-lg overflow-hidden p-0 shadow-sm">
            <DRYTable<IAdminValues[]>
                loading={loading}
                headerColumn={[
                    { label: "Name", key: "firstname" },
                    { label: "Email", key: "email" },
                    { label: "Salary", key: null },
                    { label: "Designation", key: null },
                    { label: "Joining Date", key: "date_of_joining" },
                    { label: "Status", key: null },
                    { label: "Action", key: null }
                ]}
                tableData={data?.data}
            >
                <TableBody className="hover:bg-transparent">
                    {data?.data?.map((value, idx) => (
                        <TableRow
                            key={value.id}
                            className={cn(
                                "transition-all duration-300 ease-in-out animate-fadeIn",
                                idx % 2 === 0 ? "bg-white" : "bg-gray-200/50",
                                "hover:bg-gray-100"
                            )}
                        >
                            <TableCell className="text-base  text-gray-900 px-3 py-3">
                                {value.firstname} {value.lastname ?? ""}
                            </TableCell>
                            <TableCell className="text-base  text-gray-900 px-3 py-3">{value.email}</TableCell>
                            <TableCell className="text-base  text-gray-900 px-3 py-3">₹0.00</TableCell>
                            <TableCell className="text-base  text-gray-900 px-3 py-3">{value.designation ?? "-"}</TableCell>
                            <TableCell className="text-base  text-gray-800 px-3 py-3">{formateDate(value.date_of_joining)}</TableCell>
                            <TableCell className="px-3 py-3">
                                <span
                                    className={cn(
                                        "px-3 py-1.5 rounded-full capitalize text-base  transition-all duration-200",
                                        value.status === "active"
                                            ? "bg-green-100 text-green-800 hover:bg-green-100/80"
                                            : "bg-red-100 text-red-800 hover:bg-red-100/80"
                                    )}
                                >
                                    {value.status}
                                </span>
                            </TableCell>
                            <TableCell className="px-3 py-3">
                                <DeleteDialog id={value.id} onDelete={onDelete} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </DRYTable>
        </Card>
    );
}