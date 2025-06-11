"use client"
import DynamicHeader from '@/components/headerSection/header-section'
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
    </div>
}