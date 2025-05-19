// components/sidebar/AppSidebar.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import authStore from "@/store/authStore";
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LucideUser } from "lucide-react";
import { menuItems } from "@/constants/menuItems";
import { Separator } from '@/components/ui/separator';

export function AppSidebar() {
    const pathname = usePathname();
    const user = authStore((s) => s.user);

    return (
        <Sidebar
            side="left"
            variant="inset"
            className="w-64 flex-none bg-white border-r border-gray-200 shadow-sm"
        >
            <SidebarHeader className="px-4 py-6">
                <div className="flex items-center justify-between">
                    {user?.company?.[0]?.logo_url ? (
                        <Image
                            src={user.company[0].logo_url}
                            alt={user.company[0].name}
                            width={48}
                            height={48}
                            className="rounded-full"
                        />
                    ) : (
                        <LucideUser className="w-12 h-12 text-gray-400" />
                    )}
                    <span className="ml-2 text-lg font-semibold text-gray-800">
                        {user?.company?.[0]?.name ?? "Payroll"}
                    </span>
                </div>
                <Separator className="my-4" />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {menuItems.map(({ title, url, icon: Icon }) => {
                        const active = pathname === url;
                        return (
                            <SidebarMenuItem key={title}>
                                <SidebarMenuButton asChild className={active ? "bg-blue-50" : ""}>
                                    <Link
                                        href={url}
                                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${active
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span>{title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
