"use client";

import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { TableNotFound } from "@/components/ui/table/table-notFound";
import { TableSort } from '@/components/ui/table/table-sort';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { formateDate } from '@/lib/utils';
import { IHolidayFormValues, IHolidayValues, } from '@/types/holidays';
import useHolidays from '@/hooks/use-Holidays';
import { useEffect, useState } from 'react';
import { HolidayDialogForm } from '@/components/holiday/dialog-form';

interface TableDisplayProps {
    onDelete: (id: number) => void;
}

export function TableDisplay({ onDelete, }: TableDisplayProps) {

    const columns = [
        "Name",
        "Date",
        "Day",
        "Description",
        "Action",
    ];
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<IHolidayValues[] | undefined>(undefined);

    const { updateHoliday, getHolidays } = useHolidays();

    const onUpdate = async (formdata: IHolidayFormValues, editing?: boolean, id?: number) => {
        if (editing && id) {
            setOpen(await updateHoliday(id, formdata))
        }
    }

    useEffect(() => {
        (async () => {
            const data = await getHolidays(2025);
            setData(data);
        })()
    }, [])

    return (
        <div className="rounded-md border bg-white shadow-sm overflow-x-auto">
            <Table className="table-fixed w-full">
                <TableHeader className="bg-blue-950">
                    <TableRow className="hover:bg-blue-950">
                        {columns.map((col) => (
                            <TableSort
                                key={col}
                                label={col}
                                width={"25%"}
                            />
                        ))}
                    </TableRow>
                </TableHeader>

                {!data || data.length === 0 ? (
                    <TableNotFound colSpan={columns.length} />
                ) : (
                    <TableBody>
                        {data.map((obj, index) => (
                            <TableRow
                                key={obj.id}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors`}
                            >
                                <TableCell className="px-4 py-2">{obj.holiday_name ?? "-"}</TableCell>

                                <TableCell className="px-4 py-2">{formateDate(obj.holiday_date)}</TableCell>
                                <TableCell className="px-4 py-2">{obj.week_day}</TableCell>
                                <TableCell className="px-4 py-2">
                                    {(obj.description)}
                                </TableCell>
                                <TableCell className="px-4 py-2 text-center">
                                    <div className="flex justify-start items-center gap-3">
                                        <Dialog open={open} onOpenChange={setOpen}>
                                            <DialogTrigger>
                                                <Pencil className="w-4 h-4 text-blue-600" />
                                            </DialogTrigger>
                                            <HolidayDialogForm onSubmit={onUpdate} editing={true} id={obj.id} />
                                        </Dialog>

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
                                                    <DialogClose onClick={() => onDelete(obj.id)} className='bg-red-500 rounded-xs hover:bg-red-600'>
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
