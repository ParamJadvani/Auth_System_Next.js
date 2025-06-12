"use client"
import DynamicHeader from '@/components/headerSection/header-section'
import { AddInterviewees } from '@/components/interviewees/create-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { IntervieweesStatusList } from '@/helper/helper'
import useInterviewees from '@/hooks/use-Interviewees'
import { useQueryParams } from '@/hooks/use-query-params'
import { IntervieweeApiResponse } from '@/types/interviewees'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Pagination } from "@/components/ui/pagination";
import { IntervieweesTableDisplay } from '@/components/interviewees/table-display'

const filterConfigs = [{ key: "interview_date", label: "Interview Date", type: "date" as const }, {
    key: "status",
    label: `Status`,
    type: "select" as const,
    options: IntervieweesStatusList
},]

export default function IntervieweesPage() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<IntervieweeApiResponse | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const { resetAll, applyFilters, getAllParams } = useQueryParams();
    const { get, deleteInt } = useInterviewees();
    const searchParams = useSearchParams();

    const applyFilter = (key: string, value: string | null) => {
        applyFilters({ [key]: value === "none" ? null : value, page: "1" });
    }

    const fetchInterviewees = useCallback(async () => {
        setLoading(true);
        const params = getAllParams();
        const res = await get(params);
        if (res) {
            setData(res);
            if (res.meta.current_page !== Number(params.page || 1) && res.meta.total > 0) {
                applyFilters({ page: res.meta.current_page.toString() });
            }
        }
        setLoading(false);
    }, [getAllParams, get, applyFilters]);

    const deleteInterview = async (id: number) => {
        await deleteInt(id);
        fetchInterviewees();
    }

    useEffect(() => {
        fetchInterviewees();
    }, [searchParams, fetchInterviewees]);

    return <div>
        <DynamicHeader
            section="interviewees"
            filterConfigs={filterConfigs}
            params={getAllParams()}
            applyFilter={applyFilter}
            resetAll={resetAll}
            gridClass="grid grid-cols-1 gap-4 md:grid-cols-4"
            addButton={
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-950 hover:bg-blue-950/90 text-white">
                            Add Interviewee
                        </Button>
                    </DialogTrigger>
                    <AddInterviewees />
                </Dialog>
            }
        />
        < IntervieweesTableDisplay data={data} loading={loading} onDelete={deleteInterview
        } />
        <Pagination
            data={data?.meta}
            currentPage={Number(getAllParams().page) || 1}
            onPageChange={(newPage) => applyFilters({ page: newPage.toString() })}
            onLimitChange={(limit) => applyFilters({ limit, page: "1" })}
        />
    </div>
}