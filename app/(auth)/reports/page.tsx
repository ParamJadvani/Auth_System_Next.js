"use client";
import { Button } from '@/components/ui/button';
import { CustomInput } from '@/components/ui/custom-input';
import useReports from '@/hooks/use-Reports';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SalarySlip, SalarySlipResponse } from '@/types/reports';

const PDF = { label: "PDF", value: "pdf" };
const CSV = { label: "CSV", value: "csv" };
const EXCEL = { label: "EXCEL", value: "excel" };

export default function ReportsPage() {
    const [report_name, setReportName] = useState<string>("salary");
    const [period_year, setPeriodYear] = useState<string>("annual");
    const [from_date, setFromDate] = useState<string>("");
    const [to_date, setToDate] = useState<string>("");
    const [financial_year, setFinancialYear] = useState<string>("2025-2026");
    const [file_format, setFileFormat] = useState<string>(CSV.value);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogData, setDialogData] = useState<SalarySlipResponse | null>(null);

    const { getSummaryReport } = useReports();

    const downloadReport = async () => {
        const url = `&type=${file_format}&${period_year === "monthly" ? `from_date=${from_date}&to_date=${to_date}` : `financial_year=${financial_year}`}`;
        const res = await getSummaryReport(period_year, report_name, url);
        console.log(res);
    };

    const viewReport = async () => {
        const url = period_year === "monthly" ? `from_date=${from_date}&to_date=${to_date}` : `financial_year=${financial_year}`;
        const data: SalarySlipResponse = await getSummaryReport(period_year, report_name, url);
        setDialogData(data); // Store data temporarily
        setIsDialogOpen(true); // Open dialog after data is ready
    };

    return (
        <div>
            <CustomInput
                label="Report Name"
                id="report_name"
                value={report_name}
                onValueChange={(value) => {
                    setReportName(value);
                    setPeriodYear("annual");
                    setFileFormat(value === "payroll" ? PDF.value : CSV.value);
                }}
                options={[
                    { label: "Salary Summary", value: "salary" },
                    { label: "PT Summary", value: "pt" },
                    { label: "Payroll Summary", value: "payroll" },
                    { label: "Deduction Summary", value: "deduction" },
                ]}
                select
            />

            {report_name === "salary" && (
                <CustomInput
                    label="Period Type"
                    id="period_year"
                    value={period_year}
                    options={["annual", "monthly"]}
                    onValueChange={(value) => setPeriodYear(value)}
                    radio
                />
            )}

            {period_year === "monthly" ? (
                <>
                    <CustomInput
                        label="From Date"
                        id="from_date"
                        value={from_date}
                        onValueChange={(value) => setFromDate(value)}
                        type="month"
                        placeholder="From Date"
                    />
                    <CustomInput
                        label="To Date"
                        id="to_date"
                        value={to_date}
                        onValueChange={(value) => setToDate(value)}
                        type="month"
                        placeholder="To Date"
                    />
                </>
            ) : (
                <CustomInput
                    label="Financial Year"
                    id="financial_year"
                    value={financial_year}
                    onValueChange={(value) => setFinancialYear(value)}
                    options={["2024-2025", "2025-2026"]}
                    select
                />
            )}

            <CustomInput
                label="File Format"
                id="file_format"
                value={file_format}
                onValueChange={(value) => setFileFormat(value)}
                options={
                    report_name === "salary"
                        ? [CSV, EXCEL]
                        : report_name === "pt"
                            ? [CSV, EXCEL, PDF]
                            : report_name === "payroll"
                                ? [PDF]
                                : [CSV, EXCEL, PDF]
                }
                select
            />

            <Button onClick={downloadReport} className="bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                Download
            </Button>
            <Button
                onClick={viewReport}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
                View
            </Button>

            {/* Dialog to display the table */}
            <Dialog
                open={isDialogOpen}
                onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) setDialogData(null);
                }}
            >
                <DialogContent className="w-full sm:max-w-[80vw] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Salary Slip Report</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-x-auto">
                        {dialogData && (
                            <>
                                <p className="text-sm text-gray-500 mb-4">
                                    From {dialogData.from_date} to {dialogData.to_date}
                                </p>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {dialogData.header.map((header) => (
                                                <TableHead key={header.key}>{header.label}</TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(Array.isArray(dialogData.salarySlips)
                                            ? dialogData.salarySlips
                                            : dialogData.salarySlips
                                                ? [dialogData.salarySlips]
                                                : []
                                        ).map((slip, index) => (
                                            <TableRow key={index}>
                                                {dialogData.header.map((header) => (
                                                    <TableCell key={header.key}>
                                                        {slip[header.key as keyof SalarySlip] ?? 'N/A'}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}