'use client';

import { useState, useEffect, useRef } from 'react';
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
import { IconInput } from '@/components/ui/iconInput';

export default function EmployeePage() {
    const [data, setData] = useState<EmployeesResponse | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        status: '',
        filter: '',
        date_of_joining: '',
        sort_column: 'employee_id',
        sort_order: 'desc' as 'asc' | 'desc',
        designation: '',
        from_date_of_joining: '',
        to_date_of_joining: '',
        last_working_month: '',
        next_increment_month: '',
        limit: 10,
    });

    const { deleteEmployee, createEmployee, getEmployee, getEmployeeLoginURL } = useEmployees();

    const searchRef = useRef<HTMLInputElement>(null);
    const dojRef = useRef<HTMLInputElement>(null);
    const lwmRef = useRef<HTMLInputElement>(null);
    const fromDateOfJoiningRef = useRef<HTMLInputElement>(null);
    const toDateOfJoiningRef = useRef<HTMLInputElement>(null);
    const nextIncrementMonthRef = useRef<HTMLInputElement>(null);
    const pageNumberRef = useRef<number>(1);
    const designationRef = useRef<HTMLInputElement>(null);

    const fetchEmployees = async (filtersOverride = {}) => {
        try {
            setLoading(true);
            const res = await getEmployee({
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
        fetchEmployees();
    }, []);

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        pageNumberRef.current = 1;
        fetchEmployees({ ...newFilters, page: 1 });
    };

    const resetFilters = () => {
        const cleared = {
            status: '',
            filter: '',
            date_of_joining: '',
            last_working_month: '',
            sort_column: 'employee_id',
            sort_order: 'desc' as 'asc' | 'desc',
            from_date_of_joining: '',
            to_date_of_joining: '',
            next_increment_month: '',
            designation: '',
            limit: filters.limit,
        };
        setFilters(cleared);
        pageNumberRef.current = 1;
        fetchEmployees({ ...cleared, page: 1 });

        if (searchRef.current) searchRef.current.value = '';
        if (dojRef.current) dojRef.current.value = '';
        if (lwmRef.current) lwmRef.current.value = '';
        if (toDateOfJoiningRef.current) toDateOfJoiningRef.current.value = '';
        if (fromDateOfJoiningRef.current) fromDateOfJoiningRef.current.value = '';
        if (nextIncrementMonthRef.current) nextIncrementMonthRef.current.value = '';
        if (designationRef.current) designationRef.current.value = '';
    };

    const handleSort = (key: string, order: 'asc' | 'desc') => {
        const newFilters = { ...filters, sort_column: key, sort_order: order };
        setFilters(newFilters);
        fetchEmployees({ ...newFilters });
    };

    const deleteAdminAccount = async (id: number) => {
        await deleteEmployee(id);
        fetchEmployees({ ...filters });
    };

    const createEmployeeAccount = async (data: ICreateEmployeeValues) => {
        setOpenDialog(await createEmployee(data));
        resetFilters();
    };

    const totalPages = data ? data.meta.last_page : 1;
    const currentPage = data ? pageNumberRef.current : 1;
    const hasMore = Boolean(totalPages - currentPage);

    return (
        <div className="space-y-4 p-4">
            <EmployeeFormDialog
                onSubmit={createEmployeeAccount}
                open={openDialog}
                setOpen={setOpenDialog}
            />

            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                    <IconInput
                        label="Date of Joining"
                        id="date_of_joining"
                        type="date"
                        ref={dojRef}
                        className="w-full"
                        onChange={(e) => handleFilterChange('date_of_joining', e.target.value)}
                    />
                    <IconInput
                        label="From Date of Joining"
                        id="from_date_of_joining"
                        type="date"
                        ref={fromDateOfJoiningRef}
                        className="w-full"
                        onChange={(e) => handleFilterChange('from_date_of_joining', e.target.value)}
                    />
                    <IconInput
                        label="To Date of Joining"
                        id="to_date_of_joining"
                        type="date"
                        ref={toDateOfJoiningRef}
                        className="w-full"
                        onChange={(e) => handleFilterChange('to_date_of_joining', e.target.value)}
                    />
                    <IconInput
                        label="Last Working Month"
                        id="last_working_month"
                        type="month"
                        ref={lwmRef}
                        className="w-full"
                        onChange={(e) => handleFilterChange('last_working_month', e.target.value)}
                    />
                    <IconInput
                        label="Next Increment Month"
                        id="next_increment_month"
                        type="month"
                        ref={nextIncrementMonthRef}
                        className="w-full"
                        onChange={(e) => handleFilterChange('next_increment_month', e.target.value)}
                    />

                    <div className="space-y-1">
                        <label htmlFor="status" className="text-sm font-medium">
                            Status
                        </label>
                        <Select
                            value={filters.status || 'all'}
                            onValueChange={(value) =>
                                handleFilterChange('status', value === 'all' ? '' : value)
                            }
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
                        label="Designation"
                        id="designation"
                        type="text"
                        ref={designationRef}
                        className="w-full"
                        placeholder="Designation"
                        onChange={(e) => handleFilterChange('designation', e.target.value)}
                    />

                    <IconInput
                        label="Search by Name"
                        id="search"
                        placeholder="Search"
                        ref={searchRef}
                        className="w-full"
                        onChange={(e) => handleFilterChange('filter', e.target.value)}
                    />
                </div>

                <div className="flex items-end">
                    <Button variant="outline" onClick={resetFilters} className="w-full">
                        Reset Filters
                    </Button>
                </div>
            </div>

            {/* Table */}
            <main className="flex-1">
                {error && <p className="text-red-500">{error}</p>}
                <EmployeeTable
                    data={data}
                    loading={loading}
                    onClick={handleSort}
                    sort_column={filters.sort_column}
                    sort_order={filters.sort_order}
                    deleteAdmin={deleteAdminAccount}
                    copyLoginLink={getEmployeeLoginURL}
                />
            </main>

            {/* Pagination & Record Count */}
            <div className="mt-4 flex justify-between items-center gap-4">
                {data && data.meta.total > 10 && (
                    <>

                        <div className="flex justify-center items-center gap-4">
                            <Button
                                onClick={() => {
                                    const newPage = Math.max(currentPage - 1, 1);
                                    pageNumberRef.current = newPage;
                                    fetchEmployees({ page: newPage });
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
                                    fetchEmployees({ page: newPage });
                                }}
                                disabled={!hasMore}
                            >
                                Next
                            </Button>
                        </div>
                        <div className="flex items-center space-x-6 mr-5">
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
                    </>
                )}


            </div>
        </div>
    );
}
