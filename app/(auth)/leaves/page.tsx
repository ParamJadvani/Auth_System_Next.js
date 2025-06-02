'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { Pagination } from '@/components/ui/pagination';
import { useQueryParams } from '@/hooks/use-query-params';
import { Search } from '@/components/ui/search';
import { TableDisplay } from '@/components/leaves/Table';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import useLeaves from '@/hooks/use-Leaves';
import { LeavesResponse } from '@/types/leaves';


const filterConfigs = [
    {
        key: 'leave_type',
        label: 'Leave Type',
        type: 'select',
        options: ['all', 'paid', 'non-paid'],
    },
    { key: 'leave_date', label: 'Leave Date', type: 'date' },
    { key: 'from_date', label: 'From Date', type: 'date' },
    { key: 'to_date', label: 'To Date', type: 'date' },
    {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: ['all', 'pending', 'approved', 'rejected', 'cancelled'],
    },
];

export default function AdminPage() {
    const [data, setData] = useState<LeavesResponse | null>(null);
    const [loading, setLoading] = useState(true);

    const { getLeaves, deleteLeave } = useLeaves();
    const { getAllParams, applyFilters, resetAll } = useQueryParams();
    const searchParams = useSearchParams();
    const params = getAllParams();

    const fetchLeaves = useCallback(async () => {
        setLoading(true);
        const currentParams = getAllParams();
        const res = await getLeaves(currentParams);
        if (res) {
            setData(res);
            if (res.meta.current_page !== Number(currentParams.page || 1) && res.meta.total > 0) {
                applyFilters({ page: res.meta.current_page.toString() });
            }
        }
        setLoading(false);
    }, [getAllParams, getLeaves, applyFilters]);

    const handleDelete = useCallback(async (id: number) => {
        await deleteLeave(id);
        fetchLeaves();
    }, [deleteLeave, fetchLeaves]);

    useEffect(() => {
        fetchLeaves();
    }, [searchParams, fetchLeaves]);

    return (
        <div className=" bg-gray-50 ">
            <div className="mx-auto">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Leave Management</h1>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {filterConfigs.map(({ key, label, type, options }) =>
                        type === 'date' ? (
                            <div key={key} className="space-y-2">
                                <Label htmlFor={key} className="text-sm font-medium text-gray-700">
                                    {label}
                                </Label>
                                <Flatpickr
                                    id={key}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={params[key] || ''}
                                    placeholder={`Select ${label.toLowerCase()}`}
                                    onChange={(_, dates) => {
                                        applyFilters({ [key]: dates || '' });
                                    }}
                                    options={{
                                        dateFormat: 'Y-m-d',
                                        altInput: true,
                                        altFormat: 'M j, Y',
                                        allowInput: true,
                                    }}
                                    aria-label={`Filter by ${label.toLowerCase()}`}
                                />
                            </div>
                        ) : (
                            <div key={key} className="space-y-2">
                                <Label htmlFor={key} className="text-sm font-medium text-gray-700">
                                    {label}
                                </Label>
                                <Select
                                    value={params[key] || 'all'}
                                    onValueChange={(value) => applyFilters({ [key]: value === 'all' ? '' : value })}
                                >
                                    <SelectTrigger
                                        id={key}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        aria-label={`Filter by ${label.toLowerCase()}`}
                                    >
                                        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {options!.map((option) => (
                                            <SelectItem key={option} value={option}>
                                                {option === 'all' ? 'All' : option.charAt(0).toUpperCase() + option.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )
                    )}
                    <div className="space-y-2">
                        <Search />
                    </div>
                    <div className="flex justify-between items-center mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={resetAll}
                            className="px-4 py-2 border-blue-500 text-blue-500 hover:bg-blue-50 rounded-lg"
                        >
                            Reset Filters
                        </Button>
                        <Link href="/leaves/add">
                            <Button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                                Add Leave
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="mt-8">
                    <TableDisplay data={data} onDelete={handleDelete} loading={loading} />
                </div>
                {data?.meta && (
                    <Pagination
                        data={data.meta}
                        currentPage={Number(params.page) || 1}
                        onPageChange={(newPage) => applyFilters({ page: newPage.toString() })}
                        onLimitChange={(limit) => applyFilters({ limit, page: '1' })}
                    />
                )}
            </div>
        </div>
    );
}