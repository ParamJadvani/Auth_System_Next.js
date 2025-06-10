'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { Pagination } from '@/components/ui/pagination';
import { useQueryParams } from '@/hooks/use-query-params';
import { TableDisplay } from '@/components/leaves/Table';
import Link from 'next/link';
import 'flatpickr/dist/flatpickr.min.css';
import useLeaves from '@/hooks/use-Leaves';
import { LeavesResponse } from '@/types/leaves';
import DynamicHeader from '@/components/headerSection/header-section';

// Define filterConfigs with explicit types to match FilterConfig interface
const filterConfigs = [
    {
        key: 'leave_type',
        label: 'Leave Type',
        type: 'select' as const,
        options: ['all', 'paid', 'non-paid'],
    },
    {
        key: 'leave_date',
        label: 'Leave Date',
        type: 'date' as const,
    },
    {
        key: 'from_date',
        label: 'From Date',
        type: 'date' as const,
    },
    {
        key: 'to_date',
        label: 'To Date',
        type: 'date' as const,
    },
    {
        key: 'status',
        label: 'Status',
        type: 'select' as const,
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

    const handleDelete = useCallback(
        async (id: number) => {
            await deleteLeave(id);
            fetchLeaves();
        },
        [deleteLeave, fetchLeaves]
    );

    useEffect(() => {
        fetchLeaves();
    }, [searchParams, fetchLeaves]);

    return (
        <div className="bg-gray-50">
            <div className="mx-auto">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Leave Management</h1>
                <DynamicHeader
                    params={params}
                    section="leaves"
                    filterConfigs={filterConfigs}
                    applyFilters={applyFilters}
                    resetAll={resetAll}
                    addButton={
                        <Link href="/leaves/add">
                            <Button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                                Add Leave
                            </Button>
                        </Link>
                    }
                    gridClass="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                />
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