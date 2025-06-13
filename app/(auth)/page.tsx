"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import API from "@/lib/axios";
import { DashboardResponse } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import {
    Users,
    CalendarCheck,
    CalendarDays,
    MessageCircle,
} from "lucide-react";
import { formateDate } from "@/lib/utils";

export default function DashboardPage() {
    const [dashboard, setDashboard] = useState<DashboardResponse>();
    const [openLeave, setOpenLeave] = useState(false);
    const [openHoliday, setOpenHoliday] = useState(false);
    const [openInterview, setOpenInterview] = useState(false);

    const fetchDashboard = useCallback(async () => {
        try {
            const res = await API.get<DashboardResponse>(
                "/dashboard?month=june&financial_year=2025-2026"
            );
            setDashboard(res.data);
        } catch {
            console.error("Failed to fetch dashboard data");
        }
    }, []);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    if (!dashboard) {
        return <div className="p-8 text-center text-gray-600">Loading…</div>;
    }

    return (
        <main className="space-y-10 p-6 bg-gray-50 min-h-screen">
            {/* Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/employees">
                    <Card className="cursor-pointer bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition">
                        <CardHeader className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-green-600" />
                            <CardTitle className="text-sm text-gray-700">Employees</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-green-700">{dashboard.total_user}</div>
                        </CardContent>
                    </Card>
                </Link>

                <Card onClick={() => setOpenLeave(true)} className="cursor-pointer bg-gradient-to-br from-red-50 to-red-100 hover:shadow-lg transition">
                    <CardHeader className="flex items-center gap-2">
                        <CalendarCheck className="w-5 h-5 text-red-600" />
                        <CardTitle className="text-sm text-gray-700">Leaves</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-red-700">{dashboard.leave.length}</div>
                    </CardContent>
                </Card>

                <Card onClick={() => setOpenHoliday(true)} className="cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition">
                    <CardHeader className="flex items-center gap-2">
                        <CalendarDays className="w-5 h-5 text-blue-600" />
                        <CardTitle className="text-sm text-gray-700">Holidays</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-700">{dashboard.holiday.length}</div>
                    </CardContent>
                </Card>

                <Card onClick={() => setOpenInterview(true)} className="cursor-pointer bg-gradient-to-br from-yellow-50 to-yellow-100 hover:shadow-lg transition">
                    <CardHeader className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-yellow-600" />
                        <CardTitle className="text-sm text-gray-700">Interviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-yellow-700">{dashboard.interview.length}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Payroll Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-purple-50 hover:shadow-md transition">
                    <CardHeader>
                        <CardTitle className="text-sm text-gray-700">Total CTC</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-700">
                            ₹{dashboard.totalPayable[0]?.totalSalary.toFixed(2)}
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-teal-50 hover:shadow-md transition">
                    <CardHeader>
                        <CardTitle className="text-sm text-gray-700">Employee Deduction</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-teal-700">
                            ₹{dashboard.totalPayable[0]?.totalEmployeePf.toFixed(2)}
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-orange-50 hover:shadow-md transition">
                    <CardHeader>
                        <CardTitle className="text-sm text-gray-700">Employer Deduction</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-700">
                            ₹{dashboard.totalPayable[0]?.totalEmployerPf.toFixed(2)}
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-pink-50 hover:shadow-md transition">
                    <CardHeader>
                        <CardTitle className="text-sm text-gray-700">Miscellaneous</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-pink-700">
                            ₹{dashboard.totalPayable[0]?.totalDeduction.toFixed(2)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ===== Dialogs ===== */}

            {/* Leaves Dialog */}
            <Dialog open={openLeave} onOpenChange={setOpenLeave}>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
                    <DialogHeader className="sticky top-0 bg-white z-10 border-b">
                        <DialogTitle className="text-lg font-semibold text-gray-800">
                            Leave Records
                        </DialogTitle>
                    </DialogHeader>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-100">
                                    <TableHead>ID</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>From</TableHead>
                                    <TableHead>To</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dashboard.leave.map((lv, idx) => (
                                    <TableRow key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <TableCell>{(lv as any).id}</TableCell>
                                        <TableCell>{(lv as any).type}</TableCell>
                                        <TableCell>{(lv as any).from_date}</TableCell>
                                        <TableCell>{(lv as any).to_date}</TableCell>
                                        <TableCell>{(lv as any).status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <DialogFooter className="pt-4">
                        <Button variant="outline" onClick={() => setOpenLeave(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Holidays Dialog */}
            <Dialog open={openHoliday} onOpenChange={setOpenHoliday}>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
                    <DialogHeader className="sticky top-0 bg-white z-10 border-b">
                        <DialogTitle className="text-lg font-semibold text-gray-800">
                            Holiday List
                        </DialogTitle>
                    </DialogHeader>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-100">
                                    <TableHead>Name</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Day</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dashboard.holiday.map((h, i) => (
                                    <TableRow key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <TableCell>{h.holiday_name}</TableCell>
                                        <TableCell>{formateDate(h.holiday_date)}</TableCell>
                                        <TableCell>{h.week_day}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <DialogFooter className="pt-4">
                        <Button variant="outline" onClick={() => setOpenHoliday(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Interviews Dialog */}
            <Dialog open={openInterview} onOpenChange={setOpenInterview}>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
                    <DialogHeader className="sticky top-0 bg-white z-10 border-b">
                        <DialogTitle className="text-lg font-semibold text-gray-800">
                            Interview Schedule
                        </DialogTitle>
                    </DialogHeader>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-100">
                                    <TableHead>#</TableHead>
                                    <TableHead>Candidate</TableHead>
                                    <TableHead>Interviewer</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dashboard.interview.map((iv, i) => (
                                    <TableRow key={iv.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <TableCell>{iv.no}</TableCell>
                                        <TableCell>{iv.firstname} {iv.lastname}</TableCell>
                                        <TableCell>{iv.interviewer_name}</TableCell>
                                        <TableCell>{iv.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <DialogFooter className="pt-4">
                        <Button variant="outline" onClick={() => setOpenInterview(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </main>
    );
}
