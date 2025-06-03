'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { XIcon } from 'lucide-react';
import useLeaves from '@/hooks/use-Leaves';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import flatpickr from 'flatpickr';
import { useRouter } from 'next/navigation';
import { TableCell, TableRow } from '@/components/ui/table';
import { EmployeeLeaveData, LeaveDateItem } from '@/types/leaves';

interface FormValues {
    user_id: string;
    leave_type: 'paid' | 'non-paid' | '';
    start_date: string;
    end_date: string;
    note: string;
    status: 'pending' | 'approved' | 'rejected' | 'cancelled' | '';
    attachment: File | null;
}

export default function LeavesAddPage() {
    const [leavePageData, setLeavePageData] = useState<EmployeeLeaveData[]>([]);
    const [leaveDateData, setLeaveDateData] = useState<LeaveDateItem[]>([]);
    const [toggleDate, setToggleDate] = useState(false);
    const { getLeavePageData, addLeaves, getLeavesDate } = useLeaves();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        getValues,
        formState: { isSubmitting }
    } = useForm<FormValues>({
        defaultValues: {
            user_id: '',
            leave_type: '',
            start_date: '',
            end_date: '',
            note: '',
            status: 'pending',
            attachment: null,
        },
    });

    const formatDate = useCallback((dateString: string) => {
        const date = new Date(dateString);
        return flatpickr.formatDate(date, "d-F-Y").split("-").join(" ");
    }, []);

    const updateLeaveDates = useCallback(async () => {
        const { leave_type, start_date, end_date } = getValues();
        if (leave_type.trim() && start_date) {
            const res = await getLeavesDate(start_date, end_date);
            if (res) setLeaveDateData(res);
        }
    }, [getValues, getLeavesDate]);

    const onSubmit = useCallback(async (data: FormValues) => {
        const employee = leavePageData.find(item => item.employee_id === data.user_id);
        if (!employee) return;

        const formData = new FormData();
        formData.append('user_id', employee.id);
        formData.append('leave_type', data.leave_type);
        formData.append('start_date', data.start_date);
        formData.append('end_date', data.end_date || data.start_date);
        formData.append('note', data.note);
        formData.append('status', data.status);
        leaveDateData.forEach((item, index) => {
            formData.append(`days_data[${index}][date]`, item.date);
            formData.append(`days_data[${index}][day_name_type]`, item.day_name_type.toString());
            formData.append(`days_data[${index}][day_type]`, item.day_type.toString());
        });
        if (data.attachment) formData.append('attachment', data.attachment);

        if (await addLeaves(formData)) {
            reset();
            setLeaveDateData([]);
        }
    }, [addLeaves, leavePageData, reset, leaveDateData]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getLeavePageData();
            if (res) setLeavePageData(res);
        };
        fetchData();
    }, [getLeavePageData]);

    const removeAttachment = useCallback(() => {
        setValue('attachment', null);
    }, [setValue]);

    const employeeOptions = useMemo(() => (
        leavePageData.map(emp => (
            <SelectItem key={emp.employee_id} value={emp.employee_id}>
                {emp.employee_id}
            </SelectItem>
        ))
    ), [leavePageData]);

    const leaveDateItems = useMemo(() => (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-100">
                    <th className="text-left p-3 font-medium text-gray-700">Date</th>
                    <th className="text-left p-3 font-medium text-gray-700">Day Type</th>
                </tr>
            </thead>
            <tbody>
                {leaveDateData.map(date => (
                    <TableRow key={date.date} className="border-t">
                        <TableCell className="p-3 text-gray-600">{formatDate(date.date)}</TableCell>
                        <TableCell className="p-3">
                            <Select
                                onValueChange={val => {
                                    const [day_type, day_name_type] = val.split(',').map(Number);
                                    setLeaveDateData(prev =>
                                        prev.map(item =>
                                            item.date === date.date
                                                ? { ...item, day_type, day_name_type }
                                                : item
                                        )
                                    );
                                }}
                                value={`${date.day_type},${date.day_name_type}`}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select day type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1,0">Full Day</SelectItem>
                                    <SelectItem value="0.5,1">First Half</SelectItem>
                                    <SelectItem value="0.5,2">Second Half</SelectItem>
                                </SelectContent>
                            </Select>
                        </TableCell>
                    </TableRow>
                ))}
            </tbody>
        </table>
    ), [leaveDateData, formatDate]);

    return (
        <div className="max-w-full bg-gray-50 min-h-screen">
            <Card className="w-full mx-auto shadow-lg border border-gray-200 m-0">
                <CardHeader className="border-b">
                    <CardTitle className="text-2xl font-semibold text-gray-800">
                        Add New Leave
                    </CardTitle>
                </CardHeader>

                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <Label className="block mb-2 font-medium text-gray-700">
                                    Employee ID *
                                </Label>
                                <div>
                                    <Select
                                        onValueChange={val => setValue('user_id', val)}
                                        value={watch('user_id')}
                                    >
                                        <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                            <SelectValue placeholder={"Select employee"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {employeeOptions}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <Label className="block mb-2 font-medium text-gray-700">
                                    Leave Type *
                                </Label>
                                <div>
                                    <Select
                                        onValueChange={val => {
                                            const finalValue = val === "none" ? "" : val;
                                            setValue('leave_type', finalValue as FormValues['leave_type']);
                                            updateLeaveDates();
                                        }}
                                        value={watch('leave_type') || "none"}
                                    >
                                        <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                            <SelectValue placeholder="Select Leave Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">Select Leave Type</SelectItem>
                                            <SelectItem value="paid">Paid Leave</SelectItem>
                                            <SelectItem value="non-paid">Non-Paid Leave</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <Label className="block mb-2 font-medium text-gray-700">
                                    Start Date *
                                </Label>
                                <div>
                                    <Flatpickr
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={watch('start_date')}
                                        placeholder='Start Date'
                                        onChange={(_, dates) => {
                                            setValue('start_date', dates);
                                            updateLeaveDates();
                                        }}
                                        options={{
                                            dateFormat: 'Y-m-d',
                                            altInput: true,
                                            altFormat: 'M j, Y',
                                            allowInput: true,
                                        }}
                                    />
                                </div>
                            </div>

                            {toggleDate ? (<div>
                                <Label className="block mb-2 font-medium text-gray-700">
                                    End Date (Optional for multi-day leave)
                                </Label>
                                <div className="flex items-center gap-2">
                                    <div>
                                        <Flatpickr
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={watch('end_date')}
                                            placeholder='End Date'
                                            onChange={(_, dates) => {
                                                setValue('end_date', dates);
                                                updateLeaveDates();
                                            }}
                                            options={{
                                                dateFormat: 'Y-m-d',
                                                altInput: true,
                                                altFormat: 'M j, Y',
                                                allowInput: true,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            ) : (<Button
                                type="button"
                                variant="outline"
                                className="w-full text-blue-600 hover:text-blue-700"
                                onClick={() => setToggleDate(true)}
                            >
                                + Add End Date (Multi-day leave)
                            </Button>)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <Label className="block mb-2 font-medium text-gray-700">
                                    Note *
                                </Label>
                                <Textarea
                                    placeholder="Enter the reason for leave"
                                    rows={3}
                                    {...register('note')}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <Label className="block mb-2 font-medium text-gray-700">
                                    Status *
                                </Label>
                                <div>
                                    <Select
                                        onValueChange={val => setValue('status', val as FormValues['status'])}
                                        value={watch('status')}
                                    >
                                        <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="approved">Approved</SelectItem>
                                            <SelectItem value="rejected">Rejected</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>


                        {/* Leave Days Selection */}
                        {leaveDateData.length > 0 && (
                            <div className="pt-6 border-t">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">
                                    Select Leave Days
                                </h3>
                                {leaveDateItems}
                            </div>
                        )}

                        {/* Attachment */}
                        <div className="pt-6 border-t">
                            <Label className="block mb-2 font-medium text-gray-700">
                                Attachment (Optional)
                            </Label>
                            <div className="flex items-center gap-3">
                                <Input
                                    type="file"
                                    onChange={e => setValue('attachment', e.target.files?.[0] || null)}
                                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                                />
                                {watch('attachment') && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600 truncate max-w-[150px]">
                                            {watch('attachment')?.name}
                                        </span>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={removeAttachment}
                                            className="text-red-500 border-red-200 hover:bg-red-50"
                                        >
                                            <XIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end gap-3 pt-6 ">
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => router.replace("/leaves")}
                                    className="px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Leave Request'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}