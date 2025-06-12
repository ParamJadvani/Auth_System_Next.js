"use client"

import { Button } from '@/components/ui/button';
import { CustomInput } from '@/components/ui/custom-input';
import { DialogClose } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { ShortEmployee } from '@/types/employees';
import { createInterviewRoundDetail } from '@/types/interview-rounds';
import { UseFormReturn } from 'react-hook-form';

type InterviewRoundFormProps = {
    form: UseFormReturn<createInterviewRoundDetail>;
    onSubmit: (data: createInterviewRoundDetail) => void;
    InterviewerName: ShortEmployee[];
    isEdit: boolean;
};

export function InterviewRoundForm({ form, onSubmit, InterviewerName, isEdit }: InterviewRoundFormProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CustomInput
                    id="round_no"
                    label="Round No*"
                    value={form.watch("round_no")?.toString() || "1"}
                    onValueChange={(value) => form.setValue("round_no", value)}
                    options={["1", "2", "3", "4"]}
                    select
                />

                <CustomInput
                    id="interviewer_name"
                    label="Interviewer Name"
                    placeholder="Interviewer Name"
                    value={form.watch("interviewer_name")?.toString()}
                    onValueChange={(value) => form.setValue("interviewer_name", value === "none" ? "" : value)}
                    options={[
                        { label: "Interviewer Name", value: "none" },
                        ...InterviewerName.map((val) => ({
                            label: val.firstname,
                            value: val.employee_id,
                        })),
                    ]}
                    select
                />

                <CustomInput
                    id="type"
                    label="Select type*"
                    value={form.watch("type")?.toString() || "offline"}
                    onValueChange={(value) => form.setValue("type", value)}
                    options={[
                        { label: "Offline", value: "offline" },
                        { label: "Online", value: "online" },
                    ]}
                    select
                />

                <CustomInput
                    id="mode"
                    label="Select mode*"
                    value={form.watch("mode")?.toString()}
                    onValueChange={(value) => form.setValue("mode", value)}
                    options={[
                        { label: "Question/Ans", value: "question-ans" },
                        { label: "Practical", value: "practical" },
                    ]}
                    select
                />

                <CustomInput id="start_time" label="Start time" type="datetime-local" {...form.register("start_time")} />
                <CustomInput id="end_time" label="End time" type="datetime-local" {...form.register("end_time")} />

                <CustomInput id="interviewer_note" label="Interviewer note" {...form.register("interviewer_note")} aria-rowspan={4} textarea />

                <CustomInput
                    id="status"
                    label="Status"
                    value={form.watch("status")?.toString()}
                    onValueChange={(value) => form.setValue("status", value)}
                    options={[
                        { label: "Pending", value: "pending" },
                        { label: "Processing", value: "processing" },
                        { label: "Rejected", value: "rejected" },
                        { label: "Completed", value: "completed" },
                    ]}
                    select
                />

                <div className="flex justify-end gap-4 pt-4">
                    <DialogClose asChild>
                        <Button variant="outline" type="button">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                        {isEdit ? "Update Round" : "Add Round"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};