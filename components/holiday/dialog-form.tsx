"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogContent,
} from "@/components/ui/dialog";
import { IconInput } from "@/components/ui/icon-Input";

import useHolidays from "@/hooks/use-Holidays";
import { IHolidayFormValues } from "@/types/holidays";
import { formateDate } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface HolidayDialogFormProps {
    editing?: boolean;
    id?: number;
    onSubmit: (
        formData: IHolidayFormValues,
        editing?: boolean,
        id?: number
    ) => void;
}

export function HolidayDialogForm({
    editing = false,
    id,
    onSubmit,
}: HolidayDialogFormProps) {
    const form = useForm<IHolidayFormValues>({
        defaultValues: {
            holiday_name: "",
            holiday_date: "",
            holiday_description: "",
        },
    });

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { isSubmitting },
    } = form;

    const { getHolidaysById } = useHolidays();

    useEffect(() => {
        if (id) {
            (async () => {
                const data = await getHolidaysById(id);
                if (data) {
                    reset({
                        holiday_name: data.holiday_name || "",
                        holiday_date: formateDate(data.holiday_date as string),
                        holiday_description: data.description || "",
                    });
                }
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DialogContent className="max-w-md">


            <form
                onSubmit={handleSubmit((data) => onSubmit(data, editing, id))}
                className="space-y-6"
            >


                <IconInput
                    id="holiday_name"
                    type="text"
                    placeholder="Holiday Name"
                    {...register("holiday_name", { required: true })}
                    label="Holiday Name"
                />


                <div>
                    <Label className="block mb-2 font-medium text-gray-700">
                        Holiday Date
                    </Label>
                    <div className="flex items-center gap-2">
                        <Flatpickr
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={watch('holiday_date')}
                            placeholder='Holiday Date'
                            options={{
                                dateFormat: 'Y-m-d',
                                altInput: true,
                                altFormat: 'M j, Y',
                                allowInput: true,
                                onChange: (_, dates) => {
                                    setValue('holiday_date', dates);
                                }
                            }}
                        />
                    </div>
                </div>


                <IconInput
                    id="holiday_description"
                    type="text"
                    placeholder="Holiday Description"
                    {...register("holiday_description")}
                    label="Holiday Description"
                />




                <DialogClose asChild>
                    <Button variant="outline" type="button">
                        Cancel
                    </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                    Save
                </Button>
            </form>
        </DialogContent >
    );
}
