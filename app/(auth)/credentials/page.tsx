"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CredentialResponse } from "@/types/credentials";
import useCredentials from "@/hooks/use-Credentials";
import authStore from "@/store/authStore";
import { TableDisplay } from '@/components/credentials/table-display';
import { TagResponse } from '@/types/tag';
import { Search } from '@/components/ui/search';
import { Select, SelectContent, SelectItem } from '@/components/ui/select';
import { useQueryParams } from '@/hooks/use-query-params';
import { useSearchParams } from 'next/navigation';
import { SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { Pagination } from '@/components/ui/pagination';
import useTags from '@/hooks/use-Tags';
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from '@/components/ui/alert-dialog';

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

    if (params["signedToken"]) {
        return (
            <AlertDialog open={!!params["signedToken"]}>
                <AlertDialogContent className="p-6 rounded-lg bg-white dark:bg-gray-800">
                    <div className="flex flex-col gap-4">
                        <div className="space-y-2">
                            <AlertDialogTitle className="text-lg font-semibold">Confirm Shared Credential</AlertDialogTitle>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Are you sure you want to save this shared credential? Confirm the details below and click &apos;Save&apos; to keep it, or &apos;Cancel&apos; to discard.
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
            <div className="flex items-center gap-4">
                <Search />
                <div className="space-y-2">
                    <Select
                        value={params["tag_ids"] || ''}
                        onValueChange={(value) => applyFilters({ tag_ids: value === 'all' ? '' : value })}
                    >
                        <SelectTrigger
                            id="tag_ids"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            aria-label="Filter by tags"
                        >
                            <SelectValue placeholder={params["tag_ids"] ? `Tag: ${tags?.data.find(t => t.id.toString() === params["tag_ids"])?.name || "Selected"}` : "Select Tag"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Tags</SelectItem>
                            {tags?.data?.map((option) => (
                                <SelectItem key={option.name} value={option.id.toString()}>
                                    {option.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end">
                    <Button
                        variant="outline"
                        className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
                        onClick={() => resetAll()}
                    >
                        Reset Filters
                    </Button>
                </div>
            </div>
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