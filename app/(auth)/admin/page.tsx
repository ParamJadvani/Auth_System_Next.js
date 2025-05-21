// /app/(auth)/admin/page.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import useAdmin from "@/hooks/use-Admin";
import { AdminsResponse, ICreateAdminValues, IUpdateAdminValues } from "@/types/admin";
import { IconInput } from "@/components/ui/icon-Input";
import { Pagination } from "@/components/ui/pagination";
import { useQueryParams } from "@/hooks/use-query-params";
import { Search } from "@/components/ui/search";
import { Label } from '@radix-ui/react-label';
import { Separator } from '@/components/ui/separator';
import { AdminForm } from '@/app/(auth)/admin/_AdminForm';
import { TableDisplay } from '@/components/ui/table/table-display';

const filterConfigs = [
    { key: "date_of_joining", label: "Date of Joining", type: "date" },
    { key: "last_working_date", label: "Last Working Date", type: "date" },
    { key: "status", label: "Status", type: "select", options: ["all", "active", "inactive"] },
];

export default function AdminPage() {
    const [data, setData] = useState<AdminsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const prevParamsRef = useRef<string>("");
    const isInitialRender = useRef(true);

    const { deleteAdmin, getAdmins, createAdmin } = useAdmin();
    const { getAllParams, applyFilters, resetAll } = useQueryParams();
    const searchParams = useSearchParams();

    const getParamsObject = useCallback(
        () => Object.fromEntries(getAllParams().map(({ key, value }) => [key, value || ""])),
        [getAllParams]
    );

    const fetchAdmins = useCallback(async () => {
        const params = getParamsObject();
        const paramString = new URLSearchParams(params).toString();
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

    const handleCreate = async (formData: ICreateAdminValues | IUpdateAdminValues) => {
        const shouldStayOpen = await createAdmin(formData as ICreateAdminValues);
        setOpen(shouldStayOpen);
        if (!shouldStayOpen) {
            applyFilters({ page: "1" });
        }
    };

    const params = getParamsObject();

    return (
        <div className="space-y-6">
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
                            <Label htmlFor={key} className="mb-1 block text-sm font-medium text-gray-700">
                                {label}
                            </Label>
                            <Select value={params[key] || "all"} onValueChange={(value) => applyFilter(key, value)}>
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
                <div className="mt-6 flex items-center justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => resetAll()}
                        className="w-full md:w-auto rounded-md border-blue-500 text-blue-500 hover:bg-blue-50 "
                    >
                        Reset Filters
                    </Button>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="default" className="bg-blue-950 hover:bg-blue-950/90 text-white">
                                Create New Admin
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[1200px] max-h-[90vh] overflow-y-auto px-2 sm:px-6 py-4">
                            <DialogTitle className="text-2xl">Create New Admin</DialogTitle>
                            <Separator className="bg-gray-500/50" />
                            <AdminForm isEditing={false} onSubmit={handleCreate} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <main>
                <TableDisplay data={data} onDelete={handleDelete} loading={loading} />
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