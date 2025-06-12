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
import useAdmin from "@/hooks/use-Admin";
import { AdminsResponse, ICreateAdminValues, IUpdateAdminValues } from "@/types/admin";
import { AdminForm } from '@/components/admin/form-admin';
import { TableDisplay } from '@/components/ui/table/table-display';
import DynamicHeader from "@/components/headerSection/header-section";

const filterConfigs = [
    { key: "date_of_joining", label: "Date of Joining", type: "date" as const },
    { key: "last_working_date", label: "Last Working Date", type: "date" as const },
    { key: "status", label: "Status", type: "select" as const, options: [{ label: "Select status", value: "none" }, "active", "inactive"] },
];

export default function AdminPage() {
    const [data, setData] = useState<AdminsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const { deleteAdmin, getAdmins, createAdmin } = useAdmin();
    const { getAllParams, applyFilters, resetAll } = useQueryParams();
    const searchParams = useSearchParams();
    const params = getAllParams();

    const fetchAdmins = useCallback(async () => {
        setLoading(true);
        const params = getAllParams();
        const res = await getAdmins(params);
        if (res) {
            setData(res);
            if (res.meta.current_page !== Number(params.page || 1) && res.meta.total > 0) {
                applyFilters({ page: res.meta.current_page.toString() });
            }
        }
        setLoading(false);
    }, [getAllParams, getAdmins, applyFilters]);

    const applyFilter = useCallback(
        (key: string, value: string | null) => {
            applyFilters({ [key]: value === "none" ? null : value, page: "1" });
        },
        [applyFilters]
    );

    const handleCreate = async (formData: ICreateAdminValues | IUpdateAdminValues) => {
        const res = await createAdmin(formData as ICreateAdminValues);
        setOpen(res);
        if (!res) {
            resetAll()
        }
    };

    const handleDelete = async (id: number) => {
        await deleteAdmin(id);
        fetchAdmins();
    };

    useEffect(() => {
        fetchAdmins();
    }, [searchParams, fetchAdmins]);

    return (
        <div className="space-y-6">
            <DynamicHeader
                section="admin"
                filterConfigs={filterConfigs}
                params={params}
                applyFilter={applyFilter}
                resetAll={resetAll}
                addButton={
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="default" className="bg-blue-950 hover:bg-blue-950/90 text-white">
                                Create New Admin
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[1200px] max-h-[90vh] overflow-y-auto px-2 sm:px-6 py-4">
                            <DialogTitle className="text-2xl">Create New Admin</DialogTitle>
                            <Separator className="bg-gray-500/50" />
                            <AdminForm editing={false} onSubmit={handleCreate} />
                        </DialogContent>
                    </Dialog>
                }
                gridClass="grid grid-cols-1 gap-4 md:grid-cols-5"
            />
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