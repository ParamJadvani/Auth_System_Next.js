
"use client"
import usePay from '@/hooks/use-Pay';
import { PaySectionResponse } from '@/types/pay';
import { useEffect, useState } from 'react';

export default function PayPage() {
    const [tableData, setTableData] = useState<PaySectionResponse | null>(null);
    const [holdSalaryData, setHoldSalaryData] = useState<PaySectionResponse | null>(null);
    const { getPayTableData, getHoldSalaryData } = usePay();

    const fetchData = async () => {
        const res = await getPayTableData({});
        setTableData(res);
        const holdRes = await getHoldSalaryData();
        setHoldSalaryData(holdRes);
    };

    console.log('tableData', tableData);
    console.log('holdSalaryData', holdSalaryData);

    useEffect(() => {
        fetchData();
    }, [getPayTableData, getHoldSalaryData]);
    return <div>Pay Page</div>;
}