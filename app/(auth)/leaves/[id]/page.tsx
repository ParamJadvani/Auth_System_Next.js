"use client"

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { XIcon, Edit2, Upload } from 'lucide-react';
import useLeaves from '@/hooks/use-Leaves';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import flatpickr from 'flatpickr';
import { useParams, useRouter } from 'next/navigation';
import { TableCell, TableRow } from '@/components/ui/table';
import { EmployeeLeaveData, Leave, LeaveDateItem } from '@/types/leaves';
import Link from 'next/link';

interface FormValues {
    user_id: string;
    leave_type: 'paid' | 'non-paid' | '';
    start_date: string;
    end_date: string;
    note: string;
    status: 'pending' | 'approved' | 'rejected' | 'cancelled' | '';
    attachment: File | null;
}

export default function LeavesDetailPage() {
    const [leavePageData, setLeavePageData] = useState<EmployeeLeaveData[]>([]);
    const [leaveDateData, setLeaveDateData] = useState<LeaveDateItem[]>([]);
    const [leaveData, setLeaveData] = useState<Leave | undefined>(undefined);
    const [isEditing, setIsEditing] = useState(false);
    const [showFileInput, setShowFileInput] = useState(false);
    const { getLeavePageData, getLeavesDate, getLeaveDetailData, updateLeave } = useLeaves();
    const router = useRouter();
    const params = useParams();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        getValues,
        formState: { isSubmitting, errors }
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
            const res = await getLeavesDate(start_date, end_date || start_date);
            if (res) setLeaveDateData(res);
        }
    }, [getValues, getLeavesDate]);

    const onSubmit = useCallback(async (data: FormValues) => {
        console.log('onSubmit called with data:', data);



        const formData = new FormData();
        formData.append('user_id', leaveData?.user_id.toString() || '');
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
        if (data.attachment instanceof File) {
            console.log('Appending attachment:', data.attachment.name);
            formData.append('attachment', data.attachment);
        }

        try {
            const success = await updateLeave(Number(params.id), formData);
            if (success) {
                console.log('Leave updated successfully');
                setIsEditing(false);
                setShowFileInput(false);
                setLeaveDateData([]);
                const updatedLeave = await getLeaveDetailData(params.id);
                if (updatedLeave) {
                    setLeaveData(updatedLeave);
                    reset({
                        user_id: updatedLeave.user_id.toString(),
                        leave_type: updatedLeave.leave_type,
                        start_date: new Date(updatedLeave.from_date).toISOString().split('T')[0],
                        end_date: new Date(updatedLeave.to_date).toISOString().split('T')[0],
                        note: updatedLeave.note,
                        status: updatedLeave.status,
                        attachment: null,
                    });
                }
            } else {
                console.error('Failed to update leave');
            }
        } catch (error) {
            console.error('Error updating leave:', error);
        }
    }, [updateLeave, leavePageData, reset, leaveDateData, isEditing, params.id, getLeaveDetailData]);

    const onError = useCallback((errors: any) => {
        console.error('Form validation errors:', errors);
    }, []);

    const removeAttachment = useCallback(() => {
        console.log('Removing attachment');
        setValue('attachment', null);
        setShowFileInput(false);
    }, [setValue]);

    const employeeOptions = useMemo(() => (
        leavePageData.map(emp => (
            <SelectItem key={emp.employee_id} value={emp.employee_id}>
                {emp.employee_id}
            </SelectItem>
        ))
    ), [leavePageData]);

    const leaveDateItems = useMemo(() => (
        <table className="w-full grid grid-cols-[auto,1fr]">
            <thead>
                <tr className="bg-gray-100 grid grid-cols-[1fr,1fr]">
                    <th className="text-left p-2 font-medium text-gray-700">Date</th>
                    <th className="text-left p-2 font-medium text-gray-700">Day Type</th>
                </tr>
            </thead>
            <tbody>
                {leaveDateData.map(date => (
                    <TableRow key={date.date} className="border-t grid grid-cols-[1fr,1fr]">
                        <TableCell className="p-2 text-gray-700">{formatDate(date.date)}</TableCell>
                        <TableCell className="p-2">
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
                                disabled={!isEditing}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1,0">Full Day</SelectItem>
                                    <SelectItem value="0.5,1">First Half</SelectItem>
                                    <SelectItem value="0.5,2">Last Half</SelectItem>
                                </SelectContent>
                            </Select>
                        </TableCell>
                    </TableRow>
                ))}
            </tbody>
        </table>
    ), [leaveDateData, formatDate, isEditing]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res1 = await getLeavePageData();
                if (res1) setLeavePageData(res1);
                const res2 = await getLeaveDetailData(params.id as string);
                if (res2) {
                    setLeaveData(res2);
                    const startDate = new Date(res2.from_date).toISOString().split('T')[0];
                    const endDate = new Date(res2.to_date).toISOString().split('T')[0];
                    const res3 = await getLeavesDate(startDate, endDate);
                    if (res3) setLeaveDateData(res3);
                    reset({
                        user_id: res2.user_id.toString(),
                        leave_type: res2.leave_type,
                        start_date: startDate,
                        end_date: endDate,
                        note: res2.note,
                        status: res2.status || 'pending',
                        attachment: null,
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [params.id, getLeavePageData, getLeaveDetailData, getLeavesDate, reset]);

    useEffect(() => {
        if (isEditing) {
            updateLeaveDates();
        }
    }, [watch('leave_type'), watch('start_date'), watch('end_date'), isEditing, updateLeaveDates]);

    useEffect(() => {
        console.log('Form errors:', errors);
    }, [errors]);

    const attachmentValue = watch('attachment');
    const displayAttachment = useMemo(() => {
        if (attachmentValue instanceof File) {
            return attachmentValue.name;
        } else if (leaveData?.attachment_url) {
            return (
                <Link href={leaveData.attachment_url} target="_blank" className="text-blue-600 hover:underline-blue-800 underline truncate max-w-[150px] inline-block">
                    View attachment
                </Link>
            );
        }
        return 'No attachment';
    }, [attachmentValue, leaveData?.attachment_url]);

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <Card className="max-w-4xl mx-auto shadow-lg border border-gray-200">
                <CardHeader className="border-b flex justify-between items-center">
                    <CardTitle className="text-2xl font-semibold text-gray-800">
                        Leave Details
                    </CardTitle>
                    {!isEditing && (
                        <Button
                            variant="outline"
                            onClick={() => setIsEditing(true)}
                            title="Edit leave details"
                        >
                            <Edit2 className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                    )}
                </CardHeader>

                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div>
                                <Label className="block mb-2 font-medium text-gray-700">
                                    Employee ID *
                                </Label>
                                <Select
                                    onValueChange={val => setValue('user_id', val, { shouldValidate: true })}
                                    value={watch('user_id')}
                                    disabled={!isEditing}
                                >
                                    <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                        <SelectValue placeholder="Select employee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {employeeOptions}
                                    </SelectContent>
                                </Select>
                                {errors.user_id && <p className="text-red-500 text-sm mt-1">{errors.user_id.message}</p>}
                            </div>

                            <div>
                                <Label className="block mb-2 font-medium text-gray-700">
                                    Leave Type *
                                </Label>
                                <Select
                                    onValueChange={val => {
                                        const finalValue = val === "none" ? "" : val;
                                        setValue('leave_type', finalValue as FormValues['leave_type'], { shouldValidate: true });
                                        if (isEditing) updateLeaveDates();
                                    }}
                                    value={watch('leave_type') || "none"}
                                    disabled={!isEditing}
                                >
                                    <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                        <SelectValue placeholder="Select leave type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Select leave type</SelectItem>
                                        <SelectItem value="paid">Paid Leave</SelectItem>
                                        <SelectItem value="non-paid">Non-Paid Leave</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.leave_type && <p className="text-red-500 text-sm mt-1">{errors.leave_type.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div>
                                <Label className="block mb-2 font-medium text-gray-700">
                                    Start Date *
                                </Label>
                                <Flatpickr
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                    value={watch('start_date')}
                                    placeholder="Start date"
                                    onChange={([date]) => {
                                        const formattedDate = date ? date.toISOString().split('T')[0] : '';
                                        setValue('start_date', formattedDate, { shouldValidate: true });
                                        if (isEditing) updateLeaveDates();
                                    }}
                                    options={{
                                        dateFormat: 'Y-m-d',
                                        altInput: true,
                                        altFormat: 'M j, Y',
                                        allowInput: true,
                                    }}
                                    disabled={!isEditing}
                                />
                                {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date.message}</p>}
                            </div>

                            <div>
                                <Label className="block mb-2 font-medium text-gray-700">
                                    End Date
                                </Label>
                                <Flatpickr
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                    value={watch('end_date')}
                                    placeholder="End date"
                                    onChange={([date]) => {
                                        const formattedDate = date ? date.toISOString().split('T')[0] : '';
                                        setValue('end_date', formattedDate, { shouldValidate: true });
                                        if (isEditing) updateLeaveDates();
                                    }}
                                    options={{
                                        dateFormat: 'Y-m-d',
                                        altInput: true,
                                        altFormat: 'M j, Y',
                                        allowInput: true,
                                    }}
                                    disabled={!isEditing}
                                />
                                {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label className="block mb-2 font-medium text-gray-700">
                                    Note *
                                </Label>
                                <Textarea
                                    placeholder="Enter the reason for leave"
                                    rows={3}
                                    {...register('note', { required: 'Note is required' })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                    disabled={!isEditing}
                                />
                                {errors.note && <p className="text-red-500 text-sm mt-1">{errors.note.message}</p>}
                            </div>

                            <div>
                                <Label className="block mb-2 font-medium text-gray-700">
                                    Status *
                                </Label>
                                <Select
                                    onValueChange={val => setValue('status', val as FormValues['status'], { shouldValidate: true })}
                                    value={watch('status')}
                                    disabled={!isEditing}
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
                                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                            </div>
                        </div>

                        {leaveDateData.length > 0 && (
                            <div className="pt-6 border-t">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">
                                    Leave Days
                                </h3>
                                {leaveDateItems}
                            </div>
                        )}

                        <div className="pt-6 border-t">
                            <Label className="block mb-2 font-medium text-gray-700">
                                Attachment
                            </Label>
                            <div className="flex items-center gap-3 flex-wrap">
                                {isEditing && (showFileInput || !leaveData?.attachment_url) && (
                                    <Input
                                        type="file"
                                        onChange={e => {
                                            const file = e.target.files?.[0] || null;
                                            setValue('attachment', file, { shouldValidate: true });
                                            console.log('File selected:', file?.name);
                                        }}
                                        className="flex-1 p-2 border border-gray-300 rounded-lg"
                                        disabled={!isEditing}
                                        title="Upload new attachment"
                                    />
                                )}
                                {isEditing && leaveData?.attachment_url && !showFileInput && !attachmentValue && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowFileInput(true)}
                                        className="flex items-center gap-2"
                                        title="Replace attachment"
                                    >
                                        <Upload className="h-4 w-4" />
                                        Replace Attachment
                                    </Button>
                                )}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">
                                        {displayAttachment}
                                    </span>
                                    {(attachmentValue instanceof File || (leaveData?.attachment_url && !attachmentValue)) && isEditing && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={removeAttachment}
                                            className="text-red-500 border-red-200 hover:bg-red-50"
                                            title="Remove attachment"
                                        >
                                            <XIcon className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                            {errors.attachment && <p className="text-red-500 text-sm mt-1">{errors.attachment.message}</p>}
                        </div>
                        <div className="flex justify-end gap-3 pt-6">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => {
                                    router.replace("/leaves");
                                }}
                                className="px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Update Leave Request'}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}