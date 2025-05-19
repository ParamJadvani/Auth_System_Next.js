'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import useAdmin from '@/hooks/use-Admin';
import { AdminsResponse, ICreateAdminValues, Meta } from '@/types/admin';
import { AdminFormDialog } from '@/app/(auth)/admin/_adminFormDialog';
import { AdminTable } from '@/components/admin/table';
import { IconInput } from '@/components/ui/iconInput';
import { Pagination } from '@/components/ui/pagination';
import { useQueryParams } from '@/hooks/use-query-params';

type FilterForm = {
    status: string;
    filter: string;
    date_of_joining: string;
    last_working_date: string;
    sort_column: string;
    sort_order: 'asc' | 'desc';
    limit: number;
};

export default function AdminPage() {
    const [data, setData] = useState<AdminsResponse | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const pageRef = useRef(1);

    const { deleteAdmin, createAdmin, getAdmins } = useAdmin();
    const { getParams, setParams, removeParams } = useQueryParams();

    const filterForm = useForm<FilterForm>({
        defaultValues: {
            status: '',
            filter: '',
            date_of_joining: '',
            last_working_date: '',
            sort_column: 'employee_id',
            sort_order: 'desc',
            limit: 10,
        },
    });

    const [debouncedSearch] = useDebounce(filterForm.watch('filter'), 500);

    const fetchAdmins = useCallback(async (override = {}) => {
        setLoading(true);
        const filters = { ...filterForm.getValues(), ...override, page: pageRef.current };
        const res = await getAdmins(filters);
        setData(res);
        setLoading(false);
    }, [getAdmins, filterForm]);

    const handleFilterSubmit = filterForm.handleSubmit((data) => {
        pageRef.current = 1;
        fetchAdmins({ ...data, page: 1 });
    });

    const handleReset = () => {
        filterForm.reset();
        pageRef.current = 1;
        fetchAdmins({ page: 1 });
        removeParams("s")
    };

    const handleSort = (key: string, order: 'asc' | 'desc') => {
        filterForm.setValue('sort_column', key);
        filterForm.setValue('sort_order', order);
        fetchAdmins({ sort_column: key, sort_order: order });
    };

    const handleDelete = async (id: number) => {
        await deleteAdmin(id);
        fetchAdmins();
    };

    const handleCreate = async (admin: ICreateAdminValues) => {
        const shouldStayOpen = await createAdmin(admin);
        setOpenDialog(shouldStayOpen);
        if (!shouldStayOpen) handleReset();
    };

    useEffect(() => {
        if (debouncedSearch == undefined) return;
        pageRef.current = 1;
        setParams('s', debouncedSearch);
        fetchAdmins({ filter: debouncedSearch, page: 1 });
    }, [debouncedSearch, setParams, fetchAdmins]);

    useEffect(() => {
        const initialSearch = getParams('s') || '';
        filterForm.setValue('filter', initialSearch);
        pageRef.current = 1;
        fetchAdmins({ filter: initialSearch, page: 1 });
    }, [fetchAdmins, getParams, filterForm]);

    return (
        <div className="space-y-6 p-4">
            <AdminFormDialog onSubmit={handleCreate} open={openDialog} setOpen={setOpenDialog} />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                <IconInput
                    label="Date of Joining"
                    id="date_of_joining"
                    type="date"
                    className="w-full"
                    {...filterForm.register('date_of_joining')}
                    onChange={(e) => {
                        filterForm.setValue('date_of_joining', e.target.value, { shouldDirty: true });
                        fetchAdmins({ date_of_joining: e.target.value, page: 1 });
                        pageRef.current = 1;
                    }}
                />
                <IconInput
                    label="Last Working Date"
                    id="last_working_date"
                    type="date"
                    className="w-full"
                    {...filterForm.register('last_working_date')}
                    onChange={(e) => {
                        filterForm.setValue('last_working_date', e.target.value, { shouldDirty: true });
                        fetchAdmins({ last_working_date: e.target.value, page: 1 });
                        pageRef.current = 1;
                    }}
                />
                <div>
                    <label htmlFor="status" className="text-sm font-medium mb-1 block">Status</label>
                    <Select
                        value={filterForm.watch('status') || 'all'}
                        onValueChange={(value) => {
                            const status = value === 'all' ? '' : value;
                            filterForm.setValue('status', status, { shouldDirty: true });
                            fetchAdmins({ status, page: 1 });
                            pageRef.current = 1;
                        }}
                    >
                        <SelectTrigger id="status" className="w-full">
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
                    label="Search"
                    id="search"
                    placeholder="Search"
                    className="w-full"
                    {...filterForm.register('filter')}
                />
                <div className="mt-4 flex justify-between items-center">
                    <Button type="button" variant="outline" onClick={handleReset} className="w-full md:w-auto">
                        Reset Filters
                    </Button>
                </div>
            </div>

            <main className="flex-1">
                <AdminTable
                    data={data}
                    loading={loading}
                    onClick={handleSort}
                    sort_column={filterForm.watch('sort_column')}
                    sort_order={filterForm.watch('sort_order')}
                    deleteAdmin={handleDelete}
                />
            </main>

            <Pagination
                data={data?.meta as Meta}
                currentPage={pageRef.current}
                onPageChange={(newPage) => {
                    pageRef.current = newPage;
                    fetchAdmins({ page: newPage });
                }}
                onLimitChange={(limit) => {
                    filterForm.setValue('limit', Number(limit));
                    handleFilterSubmit();
                }}
            />
        </div>
    );
}
