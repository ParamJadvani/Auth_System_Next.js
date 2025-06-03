"use client";
import { TagDialogForm } from "@/components/tags/dialog-form";
import { TagTableDisplay } from "@/components/tags/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Pagination } from '@/components/ui/pagination';
import { Search } from "@/components/ui/search";
import { useQueryParams } from '@/hooks/use-query-params';
import useTags from "@/hooks/use-Tags";
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from "react";

export default function TagsPage() {
    const [openCreate, setOpenCreate] = useState(false);
    const [data, setData] = useState<any>([]);
    const { getTags, addTag, deleteTag, updateTag } = useTags();
    const [loading, setLoading] = useState(true);

    const { getAllParams, applyFilters, resetAll } = useQueryParams();
    const searchParams = useSearchParams();
    const params = getAllParams();

    const fetchLeaves = useCallback(async () => {
        setLoading(true);
        const currentParams = getAllParams();
        const res = await getTags(currentParams);
        if (res) {
            setData(res);
            if (res.meta.current_page !== Number(currentParams.page || 1) && res.meta.total > 0) {
                applyFilters({ page: res.meta.current_page.toString() });
            }
        }
        setLoading(false);
    }, [getAllParams, getTags, applyFilters]);

    const getData = async () => {
        const res = await getTags({});
        setData(res);
    };

    const onDelete = async (id: number) => {
        await deleteTag(id);
        await getData();
    };

    const addTags = async (values: Record<string, string>) => {
        if (await addTag(values)) {
            await getData();
            setOpenCreate(false);
        }
    };

    const updateTags = async (values: Record<string, string>, editId: number | undefined) => {
        if (editId && await updateTag(editId, values)) {
            await getData();
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, [searchParams, fetchLeaves]);

    return (
        <div className="space-y-6">
            {/* Top bar: Search + Add Tag */}
            <div className="flex flex-col sm:flex-row justify-between items-center  mb-4">
                <div className="w-full sm:w-auto flex items-center justify-between">
                    <Search />
                    <Button
                        type="button"
                        variant="outline"
                        onClick={resetAll}
                        className="px-4 py-2 border-blue-500 text-blue-500 hover:bg-blue-50 rounded-lg"
                    >
                        Reset Filters
                    </Button>
                </div>

                <Dialog open={openCreate} onOpenChange={setOpenCreate}>
                    <DialogTrigger asChild>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
                            + Add Tag
                        </Button>
                    </DialogTrigger>

                    <TagDialogForm
                        onClose={() => setOpenCreate(false)}
                        onSubmit={addTags}
                    />
                </Dialog>
            </div>

            {/* Tag table */}
            <TagTableDisplay data={data} onDelete={onDelete} onEdit={updateTags} loading={loading} />

            {data?.meta && (
                <Pagination
                    data={data.meta}
                    currentPage={Number(params.page) || 1}
                    onPageChange={(newPage) => applyFilters({ page: newPage.toString() })}
                    onLimitChange={(limit) => applyFilters({ limit, page: '1' })}
                />
            )}
        </div>
    );
}
