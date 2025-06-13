"use client";

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomInput } from '@/components/ui/custom-input';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';;
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableNotFound } from '@/components/ui/table/table-notFound';
import useSalary from '@/hooks/use-salary';
import { formateDate } from '@/lib/utils';
import { AddSalary, UserSalariesResponse } from '@/types/salary';
import { ChevronDownIcon, EyeIcon } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';

interface DisplaySalaryProps {
    id: number;
}

export function DisplaySalary({ id }: DisplaySalaryProps) {
    const [data, setData] = useState<UserSalariesResponse>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dateOpen, setDateOpen] = useState(false)
    const { get, delete: del, post } = useSalary();

    const fetchData = useCallback(async () => {
        const res = await get(id);
        setData(res);
    }, [get, id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const salary = data?.salaryData;

    const form = useForm<AddSalary>();

    const submitHandler = async (data: AddSalary) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, val]) => {
            if (val instanceof FileList) {
                Array.from(val).forEach((file) => {
                    formData.append(key, file);
                });
            } else {
                formData.append(key, String(val));
            }
        });

        if (await post(id, formData)) {
            setIsDialogOpen(false);
            await fetchData();
        }
    }

    const deleteHandle = async (id: number) => {
        await del(id);
        await fetchData()
    }

    const rows = useMemo(
        () => [
            { label: "Basic Salary", key: "basic" as const },
            { label: "House Rent Allowance", key: "hra" as const },
            { label: "Conveyance Allowance", key: "ca" as const },
            { label: "Fixed Allowance", key: "fa" as const },
            { label: "Leave Encashment", key: "leaveEncash" as const },
            { label: "EPF Employee Contribution", key: "empPf" as const },
            { label: "EPF Employer Contribution", key: "empyPf" as const },
            { label: "Admin PF Charges", key: "adminPf" as const },
            { label: "EDLI PF Contribution", key: "edliPf" as const },
            { label: "ESI Employee Contribution", key: "empEsi" as const },
            { label: "ESI Employer Contribution", key: "empyEsi" as const },
            { label: "Professional Tax", key: "pt" as const },
            { label: "TDS Deduction", key: "tds" as const },
            { label: "Total Deduction", key: "totalDeduction" as const },
            { label: "Salary Amount", key: "salaryAmount" as const },
            { label: "Sub Total", key: "subTotal" as const },
            { label: "Net Payable", key: "netPayable" as const },
        ],
        []
    );

    console.log(isDialogOpen);


    return (
        <div className="overflow-x-auto">
            <Card>
                <CardHeader>
                    <CardTitle className='flex font-normal'>
                        Salary details
                    </CardTitle>
                    <CardTitle className='flex font-normal'>
                        Annual CTC
                        {data && data.salaryData.salary * 12}
                    </CardTitle>
                    <CardTitle className='flex font-normal'>
                        Monthly income
                        {data?.salaryData.salary}
                    </CardTitle>
                    <CardTitle>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    Add Salary
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md rounded-lg shadow-xl bg-white">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-semibold text-gray-800">
                                        Add Employee Salary Amount
                                    </DialogTitle>
                                </DialogHeader>

                                <form className="space-y-6 py-4"
                                    onSubmit={form.handleSubmit(submitHandler)} >
                                    {/* — Holiday Name — */}
                                    <div className="space-y-2">
                                        <CustomInput id='employee_id' label="Employee ID:"
                                            value={data?.salaryData.name}
                                            disabled />
                                    </div>

                                    {/* — Date — */}
                                    <div className="flex flex-col gap-3">
                                        <Label htmlFor="date" className="px-1">
                                            Date of birth
                                        </Label>
                                        <Popover open={dateOpen} onOpenChange={setDateOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="date"
                                                    className="w-48 justify-between font-normal"
                                                >
                                                    {form.watch("date_of_increment") ? formateDate(form.watch("date_of_increment")) : "Select date"}
                                                    <ChevronDownIcon />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={new Date(form.watch("date_of_increment"))}
                                                    captionLayout="dropdown"
                                                    onSelect={(day) => {
                                                        if (day) {
                                                            const iso = day.toISOString().split("T")[0];
                                                            form.setValue("date_of_increment", iso);
                                                        }
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <div className="space-y-2">
                                        <CustomInput id='salary_amount' label="Salary Amount:"
                                            {...form.register("salary_amount")}
                                        />
                                    </div>


                                    <div className="space-y-2">
                                        <CustomInput id='note' label="Note:" {...form.register("note")} aria-rowspan={3} textarea />
                                    </div>

                                    <div className="space-y-2">
                                        <CustomInput id='contract_file' label="Contract File:" {...form.register("contract_file")} type='file' />
                                    </div>

                                    <div className="flex justify-end space-x-4 pt-4">
                                        <DialogClose>
                                            <Button
                                                type="button"
                                                className="bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300 transition-colors duration-300"
                                                disabled={form.formState.isSubmitting}
                                            >
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button
                                            type="submit"
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-300 disabled:opacity-50"
                                            disabled={form.formState.isSubmitting}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table className="min-w-full table-fixed">
                        <TableHeader>
                            <TableRow className='bg-blue-950  hover:bg-blue-950/90 transition-all'>
                                <TableHead className="w-20 px-4 py-2 text-left text-white">Salary Component</TableHead>
                                <TableHead className="w-1 px-4 py-2 text-right text-white">Monthly</TableHead>
                                <TableHead className="w-1 px-4 py-2 text-right text-white">Annual</TableHead>
                            </TableRow>
                        </TableHeader>

                        {salary && (
                            <TableBody>
                                {rows.map(({ label, key }) => {
                                    const monthly = salary[key] ?? 0;
                                    const annual = monthly * 12;
                                    const isNet = key === "netPayable";
                                    const Cell = isNet ? TableHead : TableCell;

                                    return (
                                        <TableRow key={key}>
                                            <Cell className=" px-4 py-2">{label}</Cell>
                                            <Cell className=" px-4 py-2 text-right">
                                                {monthly.toLocaleString()}
                                            </Cell>
                                            <Cell className=" px-4 py-2 text-right">
                                                {annual.toLocaleString()}
                                            </Cell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        )}
                    </Table>
                </CardContent>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    #
                                </TableHead>
                                <TableHead>
                                    Old Salary
                                </TableHead>
                                <TableHead>
                                    Increment
                                </TableHead>
                                <TableHead>
                                    Current salary
                                </TableHead>
                                <TableHead>
                                    Percentage
                                </TableHead>
                                <TableHead>
                                    Increment date
                                </TableHead>
                                <TableHead>
                                    Note
                                </TableHead>
                                <TableHead>
                                    Contract File
                                </TableHead>
                                <TableHead>
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        {!data?.userSalaries.data || data.userSalaries.data.length === 0 ? (
                            <TableNotFound colSpan={8} />
                        ) : (
                            <TableBody>
                                {data.userSalaries.data.map(value => (
                                    <TableRow key={value.id}>
                                        <TableCell>
                                            {value.id}
                                        </TableCell>
                                        <TableCell>
                                            {value.old}
                                        </TableCell>
                                        <TableCell>
                                            {value.increment}
                                        </TableCell>
                                        <TableCell>
                                            {value.current}
                                        </TableCell>
                                        <TableCell>
                                            {value.percentage}%
                                        </TableCell>
                                        <TableCell>
                                            {formateDate(value.date_of_increment)}
                                        </TableCell>
                                        <TableCell>
                                            {value.note}
                                        </TableCell>
                                        <TableCell>
                                            {value.contract_file_url ? (
                                                <Link href={value.contract_file_url} target='_blank'>
                                                    <Button className='bg-green-600 hover:bg-green-700'>
                                                        <EyeIcon />
                                                    </Button>
                                                </Link>
                                            ) : " - "}
                                        </TableCell>
                                        <TableCell>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant={"destructive"}>
                                                        Delete
                                                    </Button>
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
                                                        <DialogClose className='bg-red-500 rounded-md p-2 text-white hover:bg-red-600' onClick={async () => deleteHandle(value.id)}>
                                                            Yes, Delete
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
