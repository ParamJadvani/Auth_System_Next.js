// components/holiday/HolidayDialogForm.tsx
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IHolidayFormValues, IHolidayValues } from "@/types/holidays";

interface HolidayDialogFormProps {
    editingHoliday: IHolidayValues | null;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: IHolidayFormValues) => Promise<void>;
}

export function HolidayDialogForm({
    editingHoliday,
    isOpen,
    onOpenChange,
    onSave,
}: HolidayDialogFormProps) {
    const { register, handleSubmit, reset, setValue, watch, formState } =
        useForm<IHolidayFormValues>({
            defaultValues: {
                holiday_name: "",
                description: "",
                holiday_date: "",
            },
        });

    // Whenever editingHoliday changes, reset the form
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

    const watchedDate = watch("holiday_date");
    const selected = watchedDate ? new Date(watchedDate) : undefined;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md rounded-lg shadow-xl bg-white">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-800">
                        {editingHoliday ? "Update Holiday" : "Create New Holiday"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSave)} className="space-y-6 py-4">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="holiday_name" className="text-gray-700 font-medium">
                            Holiday Name *
                        </Label>
                        <Input
                            id="holiday_name"
                            placeholder="e.g., Christmas"
                            className="border-2 border-gray-300 rounded-lg p-3"
                            {...register("holiday_name", { required: "Name is required" })}
                        />
                        {formState.errors.holiday_name && (
                            <p className="text-red-500 text-sm">
                                {formState.errors.holiday_name.message}
                            </p>
                        )}
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                        <Label htmlFor="holiday_date" className="text-gray-700 font-medium">
                            Date *
                        </Label>
                        <Calendar
                            mode="single"
                            selected={selected}
                            onSelect={(d) => {
                                if (d) setValue("holiday_date", d.toISOString().split("T")[0]);
                            }}
                            className="rounded-lg border border-gray-300 p-3"
                        />
                        {!watchedDate && (
                            <p className="text-red-500 text-sm">Date is required</p>
                        )}
                    </div>

                    {/* Description */}
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

                    {/* Actions */}
                    <div className="flex justify-end space-x-4 pt-4">
                        <Button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300 transition-colors duration-300"
                            disabled={formState.isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-300 disabled:opacity-50"
                            disabled={formState.isSubmitting || !watchedDate}
                        >
                            {editingHoliday ? "Update Holiday" : "Save Holiday"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
