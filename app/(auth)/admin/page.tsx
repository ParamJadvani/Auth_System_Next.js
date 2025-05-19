'use client';

import { useState, useEffect, useRef } from 'react';
import { AdminsResponse, ICreateAdminValues } from '@/types/admin';
import useAdmin from '@/hooks/use-Admin';
import { AdminTable } from '@/components/admin/table';
import { AdminFormDialog } from '@/app/(auth)/admin/_adminFormDialog';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { IconInput } from '@/components/ui/iconInput';

export default function AdminPage() {

    const [data, setData] = useState<AdminsResponse | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        status: '',
        filter: '',
        date_of_joining: '',
        last_working_date: '',
        sort_column: 'employee_id',
        sort_order: 'desc' as 'asc' | 'desc',
        limit: 10
    });

    const { deleteAdmin, createAdmin, getAdmins } = useAdmin()

    const searchRef = useRef<HTMLInputElement>(null);
    const dojRef = useRef<HTMLInputElement>(null);
    const lwdRef = useRef<HTMLInputElement>(null);
    const pageNumberRef = useRef<number>(1);

    const fetchAdmins = async (filtersOverride = {}) => {
        try {
            setLoading(true);
            const res = await getAdmins({
                ...filters,
                ...filtersOverride,
                page: pageNumberRef.current,
            });
            setData(res);
            setError(null);
        } catch {
            setError('Failed to fetch admins. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        pageNumberRef.current = 1;
        fetchAdmins({ ...newFilters, page: 1 });
    };

    const resetFilters = () => {
        const cleared = {
            status: '',
            filter: '',
            date_of_joining: '',
            last_working_date: '',
            sort_column: 'employee_id',
            sort_order: 'desc' as 'asc' | 'desc',
            limit: filters.limit,
        };
        setFilters(cleared);
        pageNumberRef.current = 1;
        fetchAdmins({ ...cleared, page: 1 });

        if (searchRef.current) searchRef.current.value = '';
        if (dojRef.current) dojRef.current.value = '';
        if (lwdRef.current) lwdRef.current.value = '';
    };

    const handleSort = (key: string, order: 'asc' | 'desc') => {
        const newFilters = { ...filters, sort_column: key, sort_order: order };
        setFilters(newFilters);
        fetchAdmins({ ...newFilters });
    };

    const deleteAdminAccount = async (id: number) => {
        await deleteAdmin(id)
        fetchAdmins({ ...filters })
    }

    const createAdminAccount = async (data: ICreateAdminValues) => {
        setOpenDialog(await createAdmin(data));
        resetFilters();
    };

    const totalPages = data ? data.meta.last_page : 1;
    const currentPage = data ? pageNumberRef.current : 1;
    const hasMore = Boolean(totalPages - currentPage)

    return (
        <div className="space-y-4 p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full">
                    <IconInput
                        label="Date of Joining"
                        id="date_of_joining"
                        type="date"
                        ref={dojRef}
                        className="w-full"
                        onChange={(e) => handleFilterChange('date_of_joining', e.target.value)}
                    />

                    <IconInput
                        label="Last Working Date"
                        id="last_working_date"
                        type="date"
                        ref={lwdRef}
                        className="w-full"
                        onChange={(e) => handleFilterChange('last_working_date', e.target.value)}
                    />

                    <div className="space-y-1">
                        <label htmlFor="status" className="text-sm font-medium">Status</label>
                        <Select
                            onValueChange={(value) => handleFilterChange('status', value === 'all' ? '' : value)}
                            value={filters.status || 'all'}
                        >
                            <SelectTrigger className="w-full" id="status">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                {['all', 'active', 'inactive'].map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status.toUpperCase()}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <IconInput
                        label="Search by Name"
                        id="search"
                        placeholder="Search"
                        className="w-full"
                        ref={searchRef}
                        onChange={(e) => handleFilterChange('filter', e.target.value)}
                    />

                    <div className="flex items-end">
                        <Button variant="outline" onClick={resetFilters} className="w-full">
                            Reset Filters
                        </Button>
                    </div>
                </div>

                <AdminFormDialog onSubmit={createAdminAccount} open={openDialog} setOpen={setOpenDialog} />
            </div>

            <main className="flex-1">
                {error && <p className="text-red-500">{error}</p>}
                <AdminTable
                    data={data}
                    loading={loading}
                    onClick={handleSort}
                    sort_column={filters.sort_column}
                    sort_order={filters.sort_order}
                    deleteAdmin={deleteAdminAccount}
                />
            </main>

            {/* Pagination & Record Count */}
            <div className="mt-4 flex justify-between items-center gap-4">
                {data && data.meta.total > 10 && (
                    <div className="flex justify-center items-center gap-4">
                        <Button
                            onClick={() => {
                                const newPage = Math.max(currentPage - 1, 1);
                                pageNumberRef.current = newPage;
                                fetchAdmins({ page: newPage });
                            }}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>

                        <span>Page {currentPage}</span>

                        <Button
                            onClick={() => {
                                const newPage = currentPage + 1;
                                pageNumberRef.current = newPage;
                                fetchAdmins({ page: newPage });
                            }}
                            disabled={!hasMore}
                        >
                            Next
                        </Button>
                    </div>
                )}
                {
                    data && data.meta.total > 10 && <div className="flex items-center space-x-6 mr-5">
                        {data && (
                            <span className="text-sm font-medium">
                                {`${(currentPage - 1) * data.meta.per_page + 1} - ${Math.min(
                                    currentPage * data.meta.per_page,
                                    data.meta.total
                                )} of ${data.meta.total} records`}
                            </span>
                        )}

                        <Select
                            value={filters.limit.toString()}
                            onValueChange={(value) => handleFilterChange('limit', value)}
                        >
                            <SelectTrigger id="limit">
                                <SelectValue placeholder="Per page" />
                            </SelectTrigger>
                            <SelectContent>
                                {['5', '10', '50', '100'].map((pageLimit) => (
                                    <SelectItem key={pageLimit} value={pageLimit}>
                                        {pageLimit}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                }

            </div>
        </div>
    );
}
