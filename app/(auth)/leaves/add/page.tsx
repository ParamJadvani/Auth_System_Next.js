"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useLeaves from '@/hooks/use-Leaves';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XIcon, } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function LeavesAddPage() {
    const [leavePageData, setLeavePageData] = useState<Array<any>>([]);
    const [leavesDate, setLeavesDate] = useState<any[] | undefined>([]);
    const [toggleDate, setToggleDate] = useState(false);
    const { getLeavePageData, addLeaves, getLeavesDate } = useLeaves();

    useEffect(() => {
        (async () => {
            const res = await getLeavePageData();
            if (res) setLeavePageData(res);
        })();
    }, [getLeavePageData]);

    const onChangeLeavedate = async (date: string) => {
        setToggleDate(false);
        const res = await getLeavesDate(date);
        setLeavesDate(res);
    };

    const form = useForm({
        defaultValues: {
            user_id: '',
            leave_type: '',
            start_date: '2025-05-23',
            end_date: '',
            note: '',
            status: 'pending',
            attachment: null,
        },
    });

    const onSubmit = (data) => {
        console.log('Form submitted:', data);
        data.user_id = leavePageData.find((item) => item.employee_id === data.user_id).id;
        const formData = new FormData();
        formData.append('user_id', data.user_id);
        formData.append('leave_type', data.leave_type);
        formData.append('start_date', data.start_date);
        formData.append('end_date', data.end_date);
        formData.append('note', data.note);
        formData.append('status', data.status);
        formData.append('attachment', data.attachment === null ? null : data.attachment);

        addLeaves(formData);
    };

    console.log('LeavesDate', leavesDate);

    return (
        <div className="p-4 bg-[#F5F7FA] min-h-screen">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-[#2C3E50]">Add New Leave</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="user_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#2C3E50]">Employee ID *</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="bg-gray-50 border-gray-300 rounded-md focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent">
                                                            <SelectValue placeholder="Select Employee ID" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {leavePageData.map((type) => (
                                                            <SelectItem key={type.employee_id} value={type.employee_id}>
                                                                {type.employee_id}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="start_date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#2C3E50]">Start Date *</FormLabel>
                                                <FormControl>
                                                    <Flatpickr
                                                        value={field.value}
                                                        onChange={(date) => {
                                                            // Convert the selected date to YYYY-MM-DD format
                                                            const formattedDate = date[0]
                                                                ? date[0].toISOString().split('T')[0]
                                                                : '';
                                                            onChangeLeavedate(formattedDate)
                                                            field.onChange(formattedDate);
                                                        }}
                                                        options={{
                                                            dateFormat: 'Y-m-d', // Internal format for the value
                                                            altInput: true,      // Show a human-readable format
                                                            altFormat: 'd M Y',  // Display format (e.g., 23 May 2025)
                                                        }}
                                                        className="bg-gray-50 border-gray-300 rounded-md w-full p-2 focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="note"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#2C3E50]">note for Leave *</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="e.g., exam"
                                                        className="bg-gray-50 border-gray-300 rounded-md focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent"
                                                        rows={3}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* Right Column */}
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="leave_type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#2C3E50]">Paid Type *</FormLabel>
                                                <Select
                                                    onValueChange={(e) => {
                                                        field.onChange(e);

                                                    }}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="bg-gray-50 border-gray-300 rounded-md focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent">
                                                            <SelectValue placeholder="Select Paid Type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="paid">Paid</SelectItem>
                                                        <SelectItem value="non-paid">Non-Paid</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex items-end gap-2">
                                        {toggleDate ? (
                                            <div className="flex items-end gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="end_date"
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormLabel className="text-[#2C3E50]">End Date *</FormLabel>
                                                            <FormControl>
                                                                <Flatpickr
                                                                    value={field.value}
                                                                    onChange={(date) => {
                                                                        const formattedDate = date[0]
                                                                            ? date[0].toISOString().split('T')[0]
                                                                            : '';
                                                                        onChangeLeavedate(formattedDate);
                                                                        field.onChange(formattedDate);
                                                                    }}
                                                                    options={{
                                                                        dateFormat: 'Y-m-d',
                                                                        altInput: true,
                                                                        altFormat: 'y M d',
                                                                    }}
                                                                    className="bg-gray-50 border-gray-300 rounded-md w-full p-2 focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent"
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => {
                                                        setToggleDate(false);
                                                        form.setValue('end_date', '');
                                                    }}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <XIcon />
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button
                                                variant="link"
                                                onClick={() => setToggleDate(true)}
                                                className="text-[#2C3E50] hover:text-[#2C3E50]/80"
                                            >
                                                MORE THAN ONE DAY?
                                            </Button>
                                        )}
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#2C3E50]">Status *</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="bg-gray-50 border-gray-300 rounded-md focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent">
                                                            <SelectValue placeholder="Select Status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="pending">Pending</SelectItem>
                                                        <SelectItem value="approved">Approved</SelectItem>
                                                        <SelectItem value="rejected">Rejected</SelectItem>
                                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="attachment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#2C3E50]">Attachment</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type="file"
                                                    className="bg-gray-50 border-gray-300 rounded-md focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent"
                                                    onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                                                />
                                                {field.value && (
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <span className="text-sm text-gray-600">{field.value}</span>
                                                        <Button
                                                            variant="ghost"
                                                            className="text-gray-500 hover:text-[#2C3E50]"
                                                            onClick={() => field.onChange(null)} // Clear the field
                                                        >
                                                            <XIcon className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end gap-4">
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="text-gray-600 border-gray-300"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-[#2C3E50] hover:bg-[#2C3E50]/90 text-white"
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}