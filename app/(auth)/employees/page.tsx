"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { Pagination } from "@/components/ui/pagination";
import { useQueryParams } from "@/hooks/use-query-params";
import { Separator } from '@/components/ui/separator';
import useEmployees from '@/hooks/use-employees';
import { EmployeesResponse, ICreateEmployeeValues, IUpdateEmployeeValues } from '@/types/employees';
import { EmployeeForm } from '@/components/employee/form-employee';
import { TableDisplay } from '@/components/ui/table/table-display';
import DynamicHeader from '@/components/headerSection/header-section';
import { EmployeesTable } from '@/components/employee/emp-table';

// Utility functions for month format conversion
const toMMYYYY = (value: string): string => {
    const [year, month] = value.split("-");
    return `${month}-${year}`;
};

const filterConfigs = [
    { key: "date_of_joining", label: "Date of Joining", type: "date" as const },
    { key: "from_date_of_joining", label: "Start Date of Joining", type: "date" as const },
    { key: "to_date_of_joining", label: "End Date of Joining", type: "date" as const },
    {
        key: "last_working_month",
        label: "Last Month of Working",
        type: "month" as const,
        onChange: (value: string) => toMMYYYY(value),
    },
    {
        key: "next_increment_month",
        label: "Next Increment Month",
        type: "month" as const,
        onChange: (value: string) => toMMYYYY(value),
    },
    {
        key: "status",
        label: "Status",
        type: "select" as const,
        options: ["all", "active", "inactive"],
    },
];

export default function EmployeesPage() {
    const [data, setData] = useState<EmployeesResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const { deleteEmployee, getEmployee, createEmployee, getEmployeeLoginURL } = useEmployees();
    const { getAllParams, applyFilters, resetAll } = useQueryParams();
    const searchParams = useSearchParams();
    const params = getAllParams();

    const fetchEmployee = useCallback(async () => {
        setLoading(true);
        const params = getAllParams();
        const res = await getEmployee(params);
        if (res) {
            setData(res);
            if (res.meta.current_page !== Number(params.page || 1) && res.meta.total > 0) {
                applyFilters({ page: res.meta.current_page.toString() });
            }
        }
        setLoading(false);
    }, [getEmployee, applyFilters, getAllParams]);

    const applyFilter = useCallback(
        (key: string, value: string | null) => {
            applyFilters({ [key]: value === "all" ? null : value, page: "1" });
        },
        [applyFilters]
    );

    const handleCreate = async (formData: ICreateEmployeeValues | IUpdateEmployeeValues) => {
        const res = await createEmployee(formData as ICreateEmployeeValues);
        setOpen(res);
        if (!res) {
            applyFilters({ page: "1" });
        }
    };

    const handleDelete = async (id: number) => {
        await deleteEmployee(id);
        fetchEmployee();
    };

    useEffect(() => {
        fetchEmployee();
    }, [searchParams, fetchEmployee]);

    return (
        <div className="space-y-6">
            <DynamicHeader
                section="employees"
                filterConfigs={filterConfigs}
                params={params}
                applyFilter={applyFilter}
                resetAll={resetAll}
                addButton={
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="default" className="bg-blue-950 hover:bg-blue-950/90 text-white">
                                Create New Employee
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[1200px] max-h-[90vh] overflow-y-auto">
                            <DialogTitle className="text-2xl">Create New Employee</DialogTitle>
                            <Separator className="bg-gray-500/50" />
                            <EmployeeForm editing={false} onSubmit={handleCreate} />
                        </DialogContent>
                    </Dialog>
                }
                gridClass="grid grid-cols-1 gap-4 md:grid-cols-4"
            />
            <main>
                {/* <TableDisplay
                    data={data}
                    onDelete={handleDelete}
                    admin={false}
                    loading={loading}
                    onCopyLoginLink={getEmployeeLoginURL}
                /> */}
                <EmployeesTable data={data} onDelete={handleDelete} loading={loading} />
            </main>
            <Pagination
                data={data?.meta}
                currentPage={Number(params.page) || 1}
                onPageChange={(newPage) => applyFilters({ page: newPage.toString() })}
                onLimitChange={(limit) => applyFilters({ limit, page: "1" })}
            />
        </div>
    );
}