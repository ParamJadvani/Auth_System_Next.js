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
import useEmployees from '@/hooks/use-employees';
import { EmployeesResponse, ICreateEmployeeValues } from '@/types/employees';
import { EmployeeFormDialog } from '@/app/(auth)/employees/_EmployeeFormDialog';
import { EmployeeTable } from '@/components/employee/table';
import { IconInput } from '@/components/ui/icon-Input';
import { Pagination } from '@/components/ui/pagination';
import { Meta } from '@/types/admin';
import { useQueryParams } from '@/hooks/use-query-params';

type FilterForm = {
    status: string;
    filter: string;
    date_of_joining: string;
    from_date_of_joining: string;
    to_date_of_joining: string;
    last_working_month: string;   // YYYY-MM for the input
    next_increment_month: string; // YYYY-MM for the input
    designation: string;
    sort_column: string;
    sort_order: 'asc' | 'desc';
    limit: number;
};

export default function EmployeePage() {
    const [data, setData] = useState<EmployeesResponse | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const pageRef = useRef(1);

    const { deleteEmployee, createEmployee, getEmployee, getEmployeeLoginURL } =
        useEmployees();
    const { getParams} = useQueryParams();

    const form = useForm<FilterForm>({
        defaultValues: {
            status: 'all',
            filter: '',
            date_of_joining: '',
            from_date_of_joining: '',
            to_date_of_joining: '',
            last_working_month: '',
            next_increment_month: '',
            designation: '',
            sort_column: 'employee_id',
            sort_order: 'desc',
            limit: 10,
        },
    });

    const [debouncedSearch] = useDebounce(form.watch('filter'), 500);

    const formatMonth = (raw: string) => {
        const [year, month] = raw.split('-');
        return month && year ? `${month}-${year}` : '';
    };

    const fetchEmployees = useCallback(
        async (overrides: Partial<FilterForm & { page: number }> = {}) => {
            setLoading(true);

            // start with all current form values
            const filters: Partial<FilterForm & { page: number }> = {
                ...form.getValues(),
                ...overrides,
            };

            // API wants empty string instead of 'all'
            if (filters.status === 'all') filters.status = '';

            // convert any month fields in overrides
            if (overrides.last_working_month) {
                filters.last_working_month = formatMonth(overrides.last_working_month);
            }
            if (overrides.next_increment_month) {
                filters.next_increment_month = formatMonth(overrides.next_increment_month);
            }

            filters.page = overrides.page ?? pageRef.current;

            const res = await getEmployee(filters);
            setData(res);
            setLoading(false);
        },
        [form, getEmployee]
    );

    const resetAll = () => {
        form.reset({
            status: 'all',
            filter: '',
            date_of_joining: '',
            from_date_of_joining: '',
            to_date_of_joining: '',
            last_working_month: '',
            next_increment_month: '',
            designation: '',
            sort_column: 'employee_id',
            sort_order: 'desc',
            limit: 10,
        });
        pageRef.current = 1;
        fetchEmployees({ page: 1 });
    };

    const handleSort = (col: string, order: 'asc' | 'desc') => {
        form.setValue('sort_column', col);
        form.setValue('sort_order', order);
        fetchEmployees({ sort_column: col, sort_order: order });
    };

    const handleDelete = async (id: number) => {
        await deleteEmployee(id);
        fetchEmployees();
    };

    const handleCreate = async (vals: ICreateEmployeeValues) => {
        const stayOpen = await createEmployee(vals);
        setOpenDialog(stayOpen);
        if (!stayOpen) resetAll();
    };

    useEffect(() => {
        if (debouncedSearch === undefined) return;
        pageRef.current = 1;
        fetchEmployees({ filter: debouncedSearch, page: 1 });
    }, [debouncedSearch, fetchEmployees]);

    useEffect(() => {
        const initial = getParams('s') || '';
        form.setValue('filter', initial);
        pageRef.current = 1;
        fetchEmployees({ filter: initial, page: 1 });
    }, [form, fetchEmployees, getParams]);

    return (
        <div className="space-y-6 p-4">
            <EmployeeFormDialog
                onSubmit={handleCreate}
                open={openDialog}
                setOpen={setOpenDialog}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[
                    { label: 'Date of Joining', id: 'date_of_joining', type: 'date' },
                    { label: 'From DOJoining', id: 'from_date_of_joining', type: 'date' },
                    { label: 'To DOJoining', id: 'to_date_of_joining', type: 'date' },
                    { label: 'Last Working Month', id: 'last_working_month', type: 'month' },
                    { label: 'Next Increment Month', id: 'next_increment_month', type: 'month' },
                ].map(({ label, id, type }) => (
                    <IconInput
                        key={id}
                        label={label}
                        id={id}
                        type={type}
                        className="w-full"
                        {...form.register(id as keyof FilterForm)}
                        value={form.watch(id as keyof FilterForm)}
                        onChange={(e) => {
                            const raw = e.target.value;
                            form.setValue(id as keyof FilterForm, raw);
                            pageRef.current = 1;
                            fetchEmployees({ [id]: raw, page: 1 });
                        }}
                    />
                ))}

                <div className="space-y-1">
                    <label htmlFor="status" className="text-sm font-medium">
                        Status
                    </label>
                    <Select
                        value={form.watch('status')}
                        onValueChange={(v) => {
                            form.setValue('status', v);
                            pageRef.current = 1;
                            fetchEmployees({ status: v, page: 1 });
                        }}
                    >
                        <SelectTrigger id="status" className="w-full">
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            {['all', 'active', 'inactive'].map((s) => (
                                <SelectItem key={s} value={s}>
                                    {s.toUpperCase()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <IconInput
                    label="Designation"
                    id="designation"
                    type="text"
                    placeholder="Designation"
                    className="w-full"
                    {...form.register('designation')}
                    value={form.watch('designation')}
                    onChange={(e) => {
                        form.setValue('designation', e.target.value);
                        pageRef.current = 1;
                        fetchEmployees({ designation: e.target.value, page: 1 });
                    }}
                />

                <IconInput
                    label="Search   "
                    id="filter"
                    placeholder="Search"
                    className="w-full"
                    {...form.register('filter')}
                    value={form.watch('filter')}
                    onChange={(e) => form.setValue('filter', e.target.value)}
                />

                <Button
                    variant="outline"
                    onClick={resetAll}
                    className="w-full col-span-full md:col-auto"
                >
                    Reset Filters
                </Button>
            </div>

            <EmployeeTable
                data={data}
                loading={loading}
                onClick={handleSort}
                sort_column={form.watch('sort_column')}
                sort_order={form.watch('sort_order')}
                deleteAdmin={handleDelete}
                copyLoginLink={getEmployeeLoginURL}
            />

            <Pagination
                data={(data?.meta as Meta) ?? {}}
                currentPage={pageRef.current}
                onPageChange={(num) => {
                    pageRef.current = num;
                    fetchEmployees({ page: num });
                }}
                onLimitChange={(lim) => {
                    form.setValue('limit', Number(lim));
                    pageRef.current = 1;
                    fetchEmployees({ limit: Number(lim), page: 1 });
                }}
            />
        </div>
    );
}
