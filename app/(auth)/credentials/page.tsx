"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CredentialResponse } from "@/types/credentials";
import useCredentials from "@/hooks/use-Credentials";
import authStore from "@/store/authStore";
import { TableDisplay } from '@/components/credentials/table-display';
import { TagResponse } from '@/types/tag';
import { useQueryParams } from '@/hooks/use-query-params';
import { useSearchParams } from 'next/navigation';
import { Pagination } from '@/components/ui/pagination';
import useTags from '@/hooks/use-Tags';
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from '@/components/ui/alert-dialog';
import DynamicHeader from '@/components/headerSection/header-section';

export default function CredentialsPage() {
    const [data, setData] = useState<CredentialResponse | undefined>(undefined);
    const [tags, setTags] = useState<TagResponse | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const { getCredentials, deleteCredentials, addCredentials } = useCredentials();
    const { getTags } = useTags();
    const userStore = authStore((s) => s.user);
    const { getAllParams, applyFilters, resetAll } = useQueryParams();
    const searchParams = useSearchParams();
    const params = getAllParams();

    const fetchData = useCallback(async () => {
        if (!userStore?.user?.id) return;
        setLoading(true);
        const currentParams = getAllParams();
        const res = await getCredentials(userStore.user.id, currentParams);
        const tagRes = await getTags({ limit: 10000 });
        if (res && tagRes) {
            setTags(tagRes);
            setData(res);
            if (res.meta.current_page !== Number(currentParams.page || 1) && res.meta.total > 0) {
                applyFilters({ page: res.meta.current_page.toString() });
            }
        }
        setLoading(false);
    }, [getAllParams, getCredentials, applyFilters, userStore?.user?.id, getTags]);

    const deleteCredential = (id: number) => deleteCredentials(id).then(() => fetchData());

    const saveTheData = useCallback(async () => {
        if (params["signedToken"]) {
            await addCredentials(undefined, userStore?.user?.id as number, params["signedToken"]);
            resetAll();
        }
    }, [addCredentials, params, userStore?.user?.id, resetAll]);

    useEffect(() => {
        fetchData();
    }, [userStore?.user?.id, searchParams, fetchData]);

    const filterConfigs = [
        {
            key: "tag_ids",
            label: "Tags",
            type: "select" as const,
            options: [{ value: "all", label: "All Tags" }, ...(tags?.data?.map(tag => ({ value: tag.id.toString(), label: tag.name })) || [])],
        },
    ];

    if (params["signedToken"]) {
        return (
            <AlertDialog open={!!params["signedToken"]}>
                <AlertDialogContent className="p-6 rounded-lg bg-white dark:bg-gray-800">
                    <div className="flex flex-col gap-4">
                        <div className="space-y-2">
                            <AlertDialogTitle className="text-lg font-semibold">Confirm Shared Credential</AlertDialogTitle>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Are you sure you want to save this shared credential? Confirm the details below and click &apos;Save&apos; to keep it, or &apos;Cancel&apos; to discard
                            </p>
                            <div className="space-y-1">
                                <p className="text-sm"><strong>Name:</strong> {params["name"] || "N/A"}</p>
                                <p className="text-sm"><strong>Website:</strong> {params["website"] || "N/A"}</p>
                                <p className="text-sm"><strong>Username:</strong> {params["username"] || "N/A"}</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-end">
                            <Button
                                variant="destructive"
                                onClick={saveTheData}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                                Save
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => resetAll()}
                                className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-4">
            <div className="flex justify-end items-center">
                <Link href="/credentials/add">
                    <Button
                        variant="link"
                        className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-50 rounded-lg"
                    >
                        Add Credentials
                    </Button>
                </Link>
            </div>
            <DynamicHeader
                section="credentials"
                filterConfigs={filterConfigs}
                params={params}
                applyFilters={applyFilters}
                resetAll={resetAll}
                gridClass="grid grid-cols-1 gap-4 sm:grid-cols-2"
            />
            <div className="border rounded-lg overflow-auto">
                <TableDisplay data={data} onDelete={deleteCredential} loading={loading} />
            </div>
            <Pagination
                data={data?.meta}
                currentPage={Number(params.page) || 1}
                onPageChange={(newPage) => applyFilters({ page: newPage.toString() })}
                onLimitChange={(limit) => applyFilters({ limit, page: "1" })}
            />
        </div>
    );
}