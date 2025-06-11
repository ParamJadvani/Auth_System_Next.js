"use client"
import DynamicHeader from '@/components/headerSection/header-section'
import { AddInterviewees } from '@/components/interviewees/create-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { IntervieweesStatusList } from '@/helper/helper'
import { useState } from 'react'

const filterConfigs = [{ key: "interview_date", label: "Interview Date", type: "date" as const }, {
    key: "status",
    label: " ",
    type: "select" as const,
    options: IntervieweesStatusList
},]

export default function IntervieweesPage() {
    const [params, setParams] = useState<Record<string, string>>({});
    const [open, setOpen] = useState(false)

    const applyFilter = (key: string, value: string | null) => {
        setParams((prevParams) => ({ ...prevParams, [key]: value }) as Record<string, string>)
    }

    const resetFilter = () => {
        setParams({})
    }

    console.log('params', params)
    return <div>
        Interviewees Page
        <DynamicHeader
            section="interviewees"
            filterConfigs={filterConfigs}
            params={params}
            applyFilter={applyFilter}
            resetAll={resetFilter}
            gridClass="grid grid-cols-1 gap-4 md:grid-cols-4"
        />
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-950 hover:bg-blue-950/90 text-white">
                    Add Interviewee
                </Button>
            </DialogTrigger>
            <AddInterviewees />
        </Dialog>
    </div>
}