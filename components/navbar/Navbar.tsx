// components/navbar/Navbar.tsx
"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import authStore from "@/store/authStore";
import useAuth from "@/hooks/use-Auth";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ChangePasswordDialog } from "@/components/navbar/ChangePasswordDialog";
import { Button } from "@/components/ui/button";
import {
    User,
    Building2,
    KeyRound,
    LogOut,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { IChangePasswordValues } from '@/types/auth';

export function Navbar({ title }: { title: string }) {
    const user = authStore((s) => s.user);
    const { logout, changePassword } = useAuth();
    const [openMenu, setOpenMenu] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleLogout = useCallback(async () => {
        await logout();
        toast.success("Logged out successfully");
    }, [logout]);

    const handleChangePwd = useCallback(
        async (data: IChangePasswordValues) => {
            const hasError = await changePassword(data);
            setOpenDialog(hasError);
        },
        [changePassword]
    );

    return (
        <div className="flex justify-between items-center bg-white w-full p-3">
            <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
            <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="secondary"
                        className="flex items-center gap-2 focus-visible:ring-0 focus-visible:border-transparent focus-visible:outline-none"
                    >
                        <User className="w-5 h-5" />
                        Profile
                        {openMenu ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                        <Link href={`/admin/${user?.user?.id}`} className="w-full justify-start gap-2 focus-visible:ring-0 focus-visible:border-transparent focus-visible:outline-none font-medium">
                            <User className="w-4 h-4" color='black' />
                            My Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Button variant="ghost" className="w-full justify-start gap-2 focus-visible:ring-0 focus-visible:border-transparent focus-visible:outline-none" onClick={() => { }}>
                            <Building2 className="w-4 h-4" color='black' />
                            Edit Company
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                            <DialogTrigger asChild>
                                <Button variant="ghost" className="w-full justify-start gap-2 focus-visible:ring-0 focus-visible:border-transparent focus-visible:outline-none">
                                    <KeyRound className="w-4 h-4" color='black' />
                                    Change Password
                                </Button>
                            </DialogTrigger>
                            <ChangePasswordDialog onSubmit={handleChangePwd} />
                        </Dialog>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 focus-visible:ring-0 focus-visible:border-transparent focus-visible:outline-none hover:bg-red-400"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4" color='black' />
                            Sign Out
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
