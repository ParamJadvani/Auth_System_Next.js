
export default async function PayPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    // const [tableData, setTableData] = useState<PaySectionResponse | null>(null);
    // const [holdSalaryData, setHoldSalaryData] = useState<PaySectionResponse | null>(null);
    // const { getPayTableData, getHoldSalaryData } = usePay();

    // const fetchData = async () => {
    //     const res = await getPayTableData({});
    //     setTableData(res);
    //     const holdRes = await getHoldSalaryData();
    //     setHoldSalaryData(holdRes);
    // };

    // console.log('tableData', tableData);
    // console.log('holdSalaryData', holdSalaryData);

    // useEffect(() => {
    //     fetchData();
    // }, [getPayTableData, getHoldSalaryData]);

    console.log(await searchParams)
    return <div>Pay Page</div>;
}