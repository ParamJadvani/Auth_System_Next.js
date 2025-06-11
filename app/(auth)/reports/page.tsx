"use client";

import { useState } from 'react';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
    Card, CardContent, CardHeader, CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CustomInput } from '@/components/ui/custom-input';
import useReports from '@/hooks/use-Reports';
import { SalarySlip, SalarySlipResponse } from '@/types/reports';

const FILE_FORMATS = {
    pdf: { label: "PDF", value: "pdf" },
    csv: { label: "CSV", value: "csv" },
    excel: { label: "EXCEL", value: "excel" },
};

export default function ReportsPage() {
    const [report_name, setReportName] = useState<string>("salary");
    const [period_year, setPeriodYear] = useState<string>("annual");
    const [from_date, setFromDate] = useState<string>("");
    const [to_date, setToDate] = useState<string>("");
    const [financial_year, setFinancialYear] = useState<string>("2025-2026");
    const [file_format, setFileFormat] = useState<string>(FILE_FORMATS.csv.value);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogData, setDialogData] = useState<SalarySlipResponse | null>(null);

    const { viewSummaryReport, downloadSummaryReport } = useReports();

    const downloadReport = async () => {
        const url =
            `&type=${file_format}&` +
            (period_year === "monthly"
                ? `from_date=${from_date}&to_date=${to_date}`
                : `financial_year=${financial_year}`);
        const res = await downloadSummaryReport(period_year, report_name, url);
        const fileURL = URL.createObjectURL(res as Blob);

        const fileLink = document.createElement("a");
        fileLink.href = fileURL;
        const filename = `${period_year}-${report_name}-${period_year === "monthly"
            ? `${from_date}-${to_date}`
            : `${financial_year}`}.${file_format}`;
        fileLink.setAttribute("download", filename.toUpperCase());
        document.body.appendChild(fileLink);
        fileLink.click();
        document.body.removeChild(fileLink);
    };

    const viewReport = async () => {
        const url = period_year === "monthly"
            ? `from_date=${from_date}&to_date=${to_date}`
            : `financial_year=${financial_year}`;
        const data: SalarySlipResponse = await viewSummaryReport(period_year, report_name, url);
        setDialogData(data);
        setIsDialogOpen(true);
    };

    const getFormatOptions = () => {
        if (report_name === "salary") return [FILE_FORMATS.csv, FILE_FORMATS.excel];
        if (report_name === "pt") return [FILE_FORMATS.csv, FILE_FORMATS.excel, FILE_FORMATS.pdf];
        if (report_name === "payroll") return [FILE_FORMATS.pdf];
        return [FILE_FORMATS.csv, FILE_FORMATS.excel, FILE_FORMATS.pdf];
    };

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <Card className="max-w-5xl mx-auto shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-blue-700">
                        Generate Summary Reports
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <CustomInput
                            label="Report Name"
                            id="report_name"
                            value={report_name}
                            onValueChange={(value) => {
                                setReportName(value);
                                setPeriodYear("annual");
                                setFileFormat(value === "payroll" ? FILE_FORMATS.pdf.value : FILE_FORMATS.csv.value);
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
                    </div>

                    {period_year === "monthly" ? (
                        <div className="grid sm:grid-cols-2 gap-4">
                            <CustomInput
                                label="From Date"
                                id="from_date"
                                value={from_date}
                                onValueChange={setFromDate}
                                type="month"
                            />
                            <CustomInput
                                label="To Date"
                                id="to_date"
                                value={to_date}
                                onValueChange={setToDate}
                                type="month"
                            />
                        </div>
                    ) : (
                        <CustomInput
                            label="Financial Year"
                            id="financial_year"
                            value={financial_year}
                            onValueChange={setFinancialYear}
                            options={["2024-2025", "2025-2026"]}
                            select
                        />
                    )}

                    <CustomInput
                        label="File Format"
                        id="file_format"
                        value={file_format}
                        onValueChange={setFileFormat}
                        options={getFormatOptions()}
                        select
                    />

                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <Button
                            onClick={downloadReport}
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                        >
                            Download Report
                        </Button>
                        <Button
                            onClick={viewReport}
                            variant="outline"
                            className="w-full sm:w-auto text-blue-600 border-blue-600 hover:bg-blue-50 rounded-md"
                        >
                            View Report
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) setDialogData(null);
            }}>
                <DialogContent className="w-full sm:max-w-[90vw] max-h-[90vh] overflow-auto">
                    <DialogHeader>
                        <DialogTitle className="text-lg">Salary Slip Report</DialogTitle>
                    </DialogHeader>

                    {dialogData ? (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Period: <strong>{dialogData.from_date}</strong> to <strong>{dialogData.to_date}</strong>
                            </p>
                            <div className="overflow-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {dialogData.header?.map((header) => (
                                                <TableHead key={header.key}>{header.label}</TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(Array.isArray(dialogData.salarySlips)
                                            ? dialogData.salarySlips
                                            : dialogData.salarySlips
                                                ? [dialogData.salarySlips]
                                                : [])?.map((slip, index) => (
                                                    <TableRow key={index}>
                                                        {dialogData.header.map((header) => (
                                                            <TableCell key={header.key}>
                                                                {slip[header.key as keyof SalarySlip] ?? '—'}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-center text-gray-500 py-6">No report data available.</p>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}