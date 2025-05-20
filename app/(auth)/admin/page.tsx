"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import useAdmin from "@/hooks/use-Admin";
import { AdminsResponse, ICreateAdminValues } from "@/types/admin";
import { AdminFormDialog } from "@/app/(auth)/admin/_adminFormDialog";
import { AdminTable } from "@/components/admin/table";
import { IconInput } from "@/components/ui/iconInput";
import { Pagination } from "@/components/ui/pagination";
import { useQueryParams } from "@/hooks/use-query-params";
import { Search } from "@/components/search/Search";

type FilterConfig = {
    key: string;
    label: string;
    type: "date" | "select";
    options?: string[];
};

export default function AdminPage() {
    const [data, setData] = useState<AdminsResponse | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const prevParamsRef = useRef<string>("");
    const isInitialRender = useRef(true);

    const { deleteAdmin, createAdmin, getAdmins } = useAdmin();
    const { getAllParams, applyFilters, resetAll } = useQueryParams();
    const searchParams = useSearchParams();

    const filterConfigs: FilterConfig[] = [
        { key: "date_of_joining", label: "Date of Joining", type: "date" },
        { key: "last_working_date", label: "Last Working Date", type: "date" },
        {
            key: "status",
            label: "Status",
            type: "select",
            options: ["all", "active", "inactive"],
        },
    ];

    const getParamsObject = useCallback(
        () =>
            Object.fromEntries(
                getAllParams().map(({ key, value }) => [key, value || ""])
            ),
        [getAllParams]
    );

    const fetchAdmins = useCallback(async () => {
        const params = getParamsObject();
        const paramString = new URLSearchParams(params).toString();

        // Always fetch on initial render or if parameters have changed
        if (isInitialRender.current || paramString !== prevParamsRef.current) {
            setLoading(true);
            const res = await getAdmins(params);
            if (res) {
                setData(res);
                if (res.meta.current_page !== Number(params.page || 1) && res.meta.total > 0) {
                    applyFilters({ page: res.meta.current_page.toString() });
                }
            }
            prevParamsRef.current = paramString;
            setLoading(false);
            isInitialRender.current = false;
        } else {
            setLoading(false);
        }
    }, [getParamsObject, getAdmins, applyFilters]);

    useEffect(() => {
        fetchAdmins();
    }, [searchParams, fetchAdmins]);

    const applyFilter = useCallback(
        (key: string, value: string | null) => {
            applyFilters({ [key]: value === "all" ? null : value, page: "1" });
        },
        [applyFilters]
    );

    const handleDelete = async (id: number) => {
        await deleteAdmin(id);
        fetchAdmins();
    };

    const handleCreate = async (admin: ICreateAdminValues) => {
        const shouldStayOpen = await createAdmin(admin);
        setOpenDialog(shouldStayOpen);
        if (!shouldStayOpen) {
           applyFilters({ page: "1" });
        }
    };

    const handleSort = (key: string, order: "asc" | "desc") => {
        applyFilters({ sort_column: key, sort_order: order });
    };

    const handleReset = () => {
        resetAll();
    };

    const params = getParamsObject();

    return (
        <div className="space-y-6 p-4 bg-gray-50 min-h-screen">
            <AdminFormDialog
                onSubmit={handleCreate}
                open={openDialog}
                setOpen={setOpenDialog}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                {filterConfigs.map(({ key, label, type, options }) =>
                    type === "date" ? (
                        <IconInput
                            key={key}
                            label={label}
                            id={key}
                            type="date"
                            className="w-full rounded-md border-gray-300 focus:ring-blue-500"
                            value={params[key] || ""}
                            onChange={(e) => applyFilter(key, e.target.value || null)}
                        />
                    ) : (
                        <div key={key}>
                            <label
                                htmlFor={key}
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                {label}
                            </label>
                            <Select
                                value={params[key] || "all"}
                                onValueChange={(value) => applyFilter(key, value)}
                            >
                                <SelectTrigger id={key} className="w-full rounded-md border-gray-300">
                                    <SelectValue placeholder={`Filter by ${label.toLowerCase()}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    {options!.map((option) => (
                                        <SelectItem key={option} value={option}>
                                            {option.toUpperCase()}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )
                )}
                <Search />
                <div className="mt-4 flex items-center justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        className="w-full md:w-auto rounded-md border-blue-500 text-blue-500 hover:bg-blue-50"
                    >
                        Reset Filters
                    </Button>
                </div>
            </div>
            <main className="flex-1">
                <AdminTable
                    data={data}
                    onSort={handleSort}
                    sort_column={params.sort_column || "employee_id"}
                    sort_order={params.sort_order || "desc"}
                    onDelete={handleDelete}
                    loading={loading}
                />
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