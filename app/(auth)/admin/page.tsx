'use client';

import { useState, useEffect, ChangeEvent, useRef } from 'react';
import { AdminsResponse } from '@/types/admin';
import useAdmin from '@/hooks/use-Admin';
import { AdminTable } from '@/components/admin/table';
import { AdminFormDialog } from '@/app/(auth)/admin/_adminFormDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';

export default function AdminPage() {
    const { getAdmins } = useAdmin();

    const [data, setData] = useState<AdminsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        status: '',
        filter: '',
        date_of_joining: '',
        last_working_date: '',
    });

    const searchRef = useRef<HTMLInputElement>(null);
    const dojRef = useRef<HTMLInputElement>(null);
    const lwdRef = useRef<HTMLInputElement>(null);

    const [sort, setSort] = useState<{ key: string; direction: 'asc' | 'desc' }>({
        key: '',
        direction: 'asc',
    });


    const handleSort = (key: string) => {
        setSort(prev => {
            const isSameKey = prev.key === key;
            const newDirection: 'asc' | 'desc' = isSameKey && prev.direction === 'asc' ? 'desc' : 'asc';


            fetchAdmins({ sort_column: key, sort_order: newDirection });

            return { key, direction: newDirection };
        });
    };
    const fetchAdmins = async (filtersOverride = {}) => {
        try {
            setLoading(true);
            const res = await getAdmins({ ...filters, ...filtersOverride });
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
        fetchAdmins(newFilters);
    };

    const resetFilters = () => {
        const cleared = {
            status: '',
            filter: '',
            date_of_joining: '',
            last_working_date: '',
        };
        setFilters(cleared);
        fetchAdmins(cleared);

        // Reset input fields
        if (searchRef.current) searchRef.current.value = '';
        if (dojRef.current) dojRef.current.value = '';
        if (lwdRef.current) lwdRef.current.value = '';
    };

    return (
        <div className="space-y-4 p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-wrap gap-4">
                    <Input
                        className="w-[200px]"
                        type="date"
                        aria-label="Date of Joining"
                        placeholder="Date of Joining"
                        ref={dojRef}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleFilterChange('date_of_joining', e.target.value)
                        }
                    />
                    <Input
                        className="w-[200px]"
                        type="date"
                        aria-label="Last Working Date"
                        placeholder="Last Working Date"
                        ref={lwdRef}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleFilterChange('last_working_date', e.target.value)
                        }
                    />

                    <Select
                        onValueChange={(value) =>
                            handleFilterChange('status', value === 'all' ? '' : value)
                        }
                        value={filters.status || 'all'}
                    >
                        <SelectTrigger className="w-[150px]">
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

                    <Input
                        className="w-[200px]"
                        aria-label="Search"
                        placeholder="Search by name"
                        ref={searchRef}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleFilterChange('filter', e.target.value)
                        }
                    />

                    <Button variant="outline" onClick={resetFilters}>
                        Reset Filters
                    </Button>
                </div>

                <AdminFormDialog />
            </div>

            <main className="flex-1">
                {error && <p className="text-red-500">{error}</p>}
                <AdminTable data={data} loading={loading} onClick={handleSort} sort={sort} />
            </main>
        </div>
    );
}
