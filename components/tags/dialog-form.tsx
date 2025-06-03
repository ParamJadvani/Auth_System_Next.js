"use client";

import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { IconInput } from "@/components/ui/icon-Input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface TagDialogFormProps {
    data?: string;
    editing?: number;
    onClose: () => void;
    onSubmit: (values: Record<string, string>, editId?: number) => void;
}

export function TagDialogForm({
    data,
    editing,
    onClose,
    onSubmit,
}: TagDialogFormProps) {
    const form = useForm({
        defaultValues: {
            name: data || "",
        },
    });

    // If the `data` prop ever changes (edit → new data), update the form value
    useEffect(() => {
        form.reset({ name: data || "" });
    }, [data, form]);

    const onSubmitForm = (values: any) => {
        if (editing) {
            onSubmit(values, editing);
        } else {
            onSubmit(values);
        }
    };

    return (
        <DialogContent className="max-w-md">
            <DialogTitle className="text-lg font-semibold pb-2">
                {editing ? "Update Tag" : "Create New Tag"}
            </DialogTitle>
            <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4 py-2">
                <IconInput
                    label="Tag Name"
                    id="name"
                    placeholder="e.g. Marketing"
                    {...form.register("name", { required: "Tag name is required" })}
                    className="w-full border px-3 py-2 rounded"
                />
                {form.formState.errors.name && (
                    <p className="text-sm text-red-600">
                        {form.formState.errors.name.message}
                    </p>
                )}
                <div className="flex justify-end space-x-3 pt-4">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300 rounded px-4 py-2"
                        disabled={form.formState.isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded px-4 py-2 disabled:opacity-50"
                        disabled={form.formState.isSubmitting}
                    >
                        {editing ? "Update" : "Save"}
                    </Button>
                </div>
            </form>
        </DialogContent>
    );
}
