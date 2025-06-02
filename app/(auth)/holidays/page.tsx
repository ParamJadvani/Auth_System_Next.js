"use client";
import { HolidayDialogForm } from '@/components/holiday/dialog-form';
import { TableDisplay } from '@/components/holiday/table-display';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import useHolidays from '@/hooks/use-Holidays';
import { IHolidayFormValues, } from '@/types/holidays';
import { useState } from 'react';


export default function HolidayPage() {
    const [open, setOpen] = useState(false);

    const { addHolidays, deleteHoliday } = useHolidays();

    const onCreate = async (formdata: IHolidayFormValues) => {
        setOpen(await addHolidays(formdata));
    }

    const onDelete = async (id: number) => {
        await deleteHoliday(id);
    }

    return (
        <div>
            <div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default" className="bg-blue-950 hover:bg-blue-950/90 text-white">
                            Add New Holiday
                        </Button>
                    </DialogTrigger>
                    <HolidayDialogForm onSubmit={onCreate} />
                </Dialog>
            </div>
            <TableDisplay onDelete={onDelete} />
        </div>
    )
}