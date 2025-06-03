"use client";

import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { formateDate } from "@/lib/utils";
import { IHolidayValues } from "@/types/holidays";

interface TableDisplayProps {
    data: IHolidayValues[] | undefined;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

export function TableDisplay({ data, onDelete, onEdit }: TableDisplayProps) {
    return (
        <div className="rounded-md border bg-white shadow-sm overflow-x-auto">
            <Table className="table-fixed w-full">
                <TableHeader className="bg-blue-950 text-white">
                    <TableRow>
                        <TableCell className="px-4 py-2 font-semibold">Name</TableCell>
                        <TableCell className="px-4 py-2 font-semibold">Date</TableCell>
                        <TableCell className="px-4 py-2 font-semibold">Day</TableCell>
                        <TableCell className="px-4 py-2 font-semibold">Description</TableCell>
                        <TableCell className="px-4 py-2 font-semibold text-center">Action</TableCell>
                    </TableRow>
                </TableHeader>

                {!data || data.length === 0 ? (
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={5} className="px-4 py-6 text-center text-gray-500">
                                No holidays found.
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ) : (
                    <TableBody>
                        {data.map((obj, idx) => (
                            <TableRow
                                key={obj.id}
                                className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                            >
                                <TableCell className="px-4 py-2">{obj.holiday_name || "-"}</TableCell>
                                <TableCell className="px-4 py-2">{formateDate(obj.holiday_date)}</TableCell>
                                <TableCell className="px-4 py-2">{obj.week_day}</TableCell>
                                <TableCell className="px-4 py-2">{obj.description || "-"}</TableCell>
                                <TableCell className="px-4 py-2 text-center">
                                    <div className="flex justify-center items-center gap-4">
                                        {/* Edit */}
                                        <button onClick={() => onEdit(obj.id)} className="p-1 rounded hover:bg-blue-100">
                                            <Pencil className="w-4 h-4 text-blue-600" />
                                        </button>

                                        {/* Delete */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="p-1 rounded hover:bg-red-100">
                                                    <Trash className="w-4 h-4 text-red-600" />
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle className="text-lg font-medium">Confirm Delete</DialogTitle>
                                                    <p className="mt-2 text-sm text-gray-600">
                                                        Are you sure you want to delete this holiday? This action cannot be undone.
                                                    </p>
                                                </DialogHeader>
                                                <DialogFooter className="flex justify-end gap-3 pt-4">
                                                    <DialogClose className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                                                        Cancel
                                                    </DialogClose>
                                                    <DialogClose
                                                        onClick={() => onDelete(obj.id)}
                                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                                    >
                                                        Delete
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
