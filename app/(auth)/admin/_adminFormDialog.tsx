"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogClose,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
} from "@/components/ui/form";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
    Calendar as CalendarIcon,
    User as UserIcon,
    Mail as MailIcon,
    Globe as GlobeIcon,
    Lock as LockIcon,
} from "lucide-react";
import { createAdminSchema, CreateAdminValues } from "@/lib/validations/admin";
import { IconInput } from "@/components/ui/iconInput";
import { Separator } from '@/components/ui/separator';
import useAdmin from '@/hooks/useAdmin';

export function AdminFormDialog() {
    const [open, setOpen] = useState(false);

    const form = useForm<CreateAdminValues>({
        resolver: zodResolver(createAdminSchema),
        defaultValues: {
            firstname: "",
            middlename: "",
            lastname: "",
            nationality: "",
            email: "",
            password: "",
            gender: "male",
            marital_status: "unmarried",
            blood_group: "",
            date_of_birth: "",
            date_of_joining: "",
            probation_end_date: "",
            status: "active",
            last_working_date: "",
            pf_contribution: 0,
            abry_contribution: 0,
            esi_contribution: 0,
        },
    });

    const createAdminAccount = useAdmin().createAdmin;

    const onSubmit = async (data: CreateAdminValues) => {
        setOpen(await createAdminAccount(data));
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className='bg-blue-950 hover:bg-blue-950/90 text-white'>
                    Create New Admin</Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[1200px] max-h-[90vh] overflow-y-auto px-2 sm:px-6 py-4">
                <Card className="border-0 shadow-none">
                    <CardHeader>
                        <DialogTitle className='text-2xl'>Create New Admin</DialogTitle>
                        <Separator className='bg-gray-500/50 ' />
                    </CardHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardContent className="space-y-8">
                                {/* Row 1: firstName, middleName, lastName */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <FormControl className='space-y-1'>
                                        <IconInput
                                            label='First Name'
                                            id="firstname"
                                            placeholder="First Name"
                                            icon={UserIcon}
                                            {...form.register("firstname")}
                                        />
                                    </FormControl>
                                    <FormControl className='space-y-1'>
                                        <IconInput
                                            label='Middle Name'
                                            id="middlename"
                                            placeholder="Middle Name"
                                            icon={UserIcon}
                                            {...form.register("middlename")}
                                        />
                                    </FormControl>
                                    <FormControl className='space-y-1'>
                                        <IconInput
                                            label='Last Name'
                                            id="lastname"
                                            placeholder="Last Name"
                                            icon={UserIcon}
                                            {...form.register("lastname")}
                                        />
                                    </FormControl>
                                </div>

                                {/* Row 2: nationality, email, password */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <FormControl className='space-y-1'>
                                        <IconInput
                                            label='Nationality'
                                            id="nationality"
                                            placeholder="Nationality"
                                            icon={GlobeIcon}
                                            {...form.register("nationality")}
                                        />
                                    </FormControl>
                                    <FormControl className='space-y-1'>
                                        <IconInput
                                            label='Email'
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                            icon={MailIcon}
                                            {...form.register("email")}
                                        />
                                    </FormControl>
                                    <FormControl className='space-y-1'>
                                        <IconInput
                                            label='Password'
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            icon={LockIcon}
                                            {...form.register("password")}
                                        />
                                    </FormControl>
                                </div>

                                {/* Row 3: gender, marital_status */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div className='space-y-1'>
                                        <label className="block text-sm font-medium">
                                            Gender <span className="text-destructive">*</span>
                                        </label>
                                        <RadioGroup
                                            value={form.watch("gender")}
                                            onValueChange={(value) => form.setValue("gender", value as CreateAdminValues["gender"], { shouldValidate: true })}
                                            className="flex space-x-4"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="male" id="male" />
                                                <label htmlFor="male" className="font-normal">Male</label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="female" id="female" />
                                                <label htmlFor="female" className="font-normal">Female</label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="other" id="other" />
                                                <label htmlFor="other" className="font-normal">Other</label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    <div className='space-y-1'>
                                        <label className="block text-sm font-medium">
                                            Marital Status <span className="text-destructive">*</span>
                                        </label>
                                        <RadioGroup
                                            value={form.watch("marital_status")}
                                            onValueChange={(value) => form.setValue("marital_status", value as CreateAdminValues["marital_status"], { shouldValidate: true })}
                                            className="flex space-x-4"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="unmarried" id="unmarried" />
                                                <label htmlFor="unmarried" className="font-normal">Unmarried</label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="engaged" id="engaged" />
                                                <label htmlFor="engaged" className="font-normal">Engaged</label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="married" id="married" />
                                                <label htmlFor="married" className="font-normal">Married</label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>

                                {/* Row 4: date_of_birth, date_of_joining, probation_end_date */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <FormControl className='space-y-1'>
                                        <IconInput
                                            label='Date of Birth'
                                            id="date_of_birth"
                                            type="date"
                                            icon={CalendarIcon}
                                            {...form.register("date_of_birth")}
                                        />
                                    </FormControl>
                                    <FormControl className='space-y-1'>
                                        <IconInput
                                            label='Date of Joining'
                                            id="date_of_joining"
                                            type="date"
                                            icon={CalendarIcon}
                                            {...form.register("date_of_joining")}
                                        />
                                    </FormControl>
                                    <FormControl className='space-y-1'>
                                        <IconInput
                                            label='Probation End Date'
                                            id="probation_end_date"
                                            type="date"
                                            icon={CalendarIcon}
                                            {...form.register("probation_end_date")}
                                        />
                                    </FormControl>
                                </div>

                                {/* Row 5: blood_group, status, last_working_date */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {/* Blood Group */}
                                    <div className="space-y-1">
                                        <label htmlFor="blood_group" className="block text-sm font-medium">
                                            Blood Group
                                        </label>
                                        <Select
                                            value={form.watch("blood_group") ?? ""}
                                            onValueChange={(value) =>
                                                form.setValue("blood_group", value as CreateAdminValues["blood_group"], {
                                                    shouldValidate: true,
                                                })
                                            }
                                        >
                                            <SelectTrigger id="blood_group">
                                                <SelectValue placeholder="Select blood group" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {["a+", "a-", "b+", "b-", "ab+", "ab-", "o+", "o-"].map((bg) => (
                                                    <SelectItem key={bg} value={bg}>
                                                        {bg.toUpperCase()}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Status */}
                                    <div className="space-y-1">
                                        <label htmlFor="status" className="block text-sm font-medium">
                                            Status <span className="text-destructive">*</span>
                                        </label>
                                        <Select
                                            value={form.watch("status")}
                                            onValueChange={(value) =>
                                                form.setValue("status", value as CreateAdminValues["status"], {
                                                    shouldValidate: true,
                                                })
                                            }
                                        >
                                            <SelectTrigger id="status">
                                                <SelectValue>
                                                    {form.watch("status")}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Last Working Date */}
                                    <FormControl>
                                        <IconInput
                                            label="Last Working Date"
                                            id="last_working_date"
                                            type="date"
                                            icon={CalendarIcon}
                                            {...form.register("last_working_date")}
                                        />
                                    </FormControl>
                                </div>

                                {/* Row 6: contributions */}
                                <div className="flex flex-wrap gap-4">
                                    {(["pf_contribution", "abry_contribution", "esi_contribution"] as const).map((name) => (
                                        <div
                                            key={name}
                                            className="flex items-center w-full sm:w-[48%] lg:w-[32%] bg-muted/30 rounded-md px-4 py-2"
                                        >
                                            <label className="capitalize mr-auto text-sm font-medium">
                                                {name.split("_")[0].toUpperCase() + " Contribution*"}
                                            </label>
                                            <Switch
                                                checked={form.watch(name) === 1}
                                                onCheckedChange={(checked) =>
                                                    form.setValue(name, checked ? 1 : 0, { shouldValidate: true })
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end space-x-2 mt-4">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? "Saving..." : "Save"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            </DialogContent>
        </Dialog>
    );
}