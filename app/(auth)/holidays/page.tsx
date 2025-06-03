"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import useHolidays from "@/hooks/use-Holidays";
import { IHolidayFormValues, IHolidayValues } from "@/types/holidays";
import { TableDisplay } from "@/components/holiday/table-display";

export default function HolidaysPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingHoliday, setEditingHoliday] = useState<IHolidayValues | undefined | null>(null);
    const [holidays, setHolidays] = useState<IHolidayValues[] | undefined>(undefined);

    const { getHolidays, getHolidaysById, addHolidays, updateHoliday, deleteHoliday } = useHolidays();

    const fetchAll = useCallback(async () => {
        const res = await getHolidays(2025);
        setHolidays(res);
    }, [getHolidays]);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);


    const { register, handleSubmit, reset, setValue, watch, formState } = useForm<IHolidayFormValues>({
        defaultValues: {
            holiday_name: "",
            description: "",
            holiday_date: "",
        },
    });
    const watchingDate = watch("holiday_date");

    useEffect(() => {
        if (editingHoliday) {
            reset({
                holiday_name: editingHoliday.holiday_name,
                description: editingHoliday.description || "",
                holiday_date: editingHoliday.holiday_date.split("T")[0],
            });
        } else {
            reset({ holiday_name: "", description: "", holiday_date: "" });
        }
    }, [editingHoliday, reset]);


    const onAddClick = () => {
        setEditingHoliday(null);
        setIsDialogOpen(true);
    };


    const onEditClick = async (id: number) => {
        setIsDialogOpen(true);
        const data = await getHolidaysById(id);
        setEditingHoliday(data);
    };


    const onDeleteClick = async (id: number) => {
        await deleteHoliday(id);
        await fetchAll();
    };


    const onSubmit = async (formValues: IHolidayFormValues) => {

        const payload: IHolidayFormValues = {
            ...formValues,
            holiday_date: watchingDate,
        };

        if (editingHoliday === null) {
            const ok = await addHolidays(payload);
            if (ok) {
                setIsDialogOpen(false);
                await fetchAll();
            }
        } else {
            const ok = await updateHoliday(editingHoliday?.id as number, payload);
            if (ok) {
                setIsDialogOpen(false);
                await fetchAll();
            }
        }
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setEditingHoliday(null);
        reset({ holiday_name: "", description: "", holiday_date: "" });
    };

    const selectedDate = watchingDate ? new Date(watchingDate) : undefined;

    return (
        <div >
            <div >
                <div className="flex justify-between items-center mb-8">
                    <></>
                    <Button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-all duration-300 transform hover:scale-105"
                        onClick={onAddClick}
                    >
                        <PlusIcon className="mr-2" />
                        Add Holiday
                    </Button>
                </div>


                <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                    <DialogContent className="sm:max-w-md rounded-lg shadow-xl bg-white">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-gray-800">
                                {editingHoliday ? "Update Holiday" : "Create New Holiday"}
                            </DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
                            {/* — Holiday Name — */}
                            <div className="space-y-2">
                                <Label htmlFor="holiday_name" className="text-gray-700 font-medium">
                                    Holiday Name *
                                </Label>
                                <Input
                                    id="holiday_name"
                                    placeholder="e.g., Christmas"
                                    className="border-2 border-gray-300 rounded-lg p-3"
                                    {...register("holiday_name")}
                                />
                            </div>

                            {/* — Date — */}
                            <div className="space-y-2">
                                <Label htmlFor="holiday_date" className="text-gray-700 font-medium">
                                    Date *
                                </Label>
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={(day) => {
                                        if (day) {
                                            const iso = day.toISOString().split("T")[0];
                                            setValue("holiday_date", iso);
                                        }
                                    }}
                                    className="rounded-lg border border-gray-300 p-3"
                                />
                            </div>

                            {/* — Description — */}
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-gray-700 font-medium">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe the holiday..."
                                    className="border-2 border-gray-300 rounded-lg p-3 min-h-[100px]"
                                    {...register("description")}
                                />
                            </div>

                            <div className="flex justify-end space-x-4 pt-4">
                                <Button
                                    type="button"
                                    onClick={closeDialog}
                                    className="bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300 transition-colors duration-300"
                                    disabled={formState.isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-300 disabled:opacity-50"
                                    disabled={formState.isSubmitting || !watchingDate}
                                >
                                    {editingHoliday ? "Update Holiday" : "Save Holiday"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                <div className="mt-6">
                    <TableDisplay data={holidays} onDelete={onDeleteClick} onEdit={onEditClick} />
                </div>
            </div>
        </div>
    );
}
