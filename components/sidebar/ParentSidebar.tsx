// components/sidebar/ParentSidebar.tsx
"use client";

import { ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { menuItems } from "@/constants/menuItems";
import { Navbar } from "@/components/navbar/Navbar";
import { AppSidebar } from '@/components/sidebar/AppSidebar';

export default function ParentSidebar({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const active = useMemo(
        () => menuItems.find((item) => item.url === pathname),
        [pathname]
    );

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-1 flex-col bg-gray-50">
                <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
                    <Navbar title={active?.title ?? "Dashboard"} />
                </header>
                <main className="flex-1 overflow-auto p-6">{children}</main>
            </div>
        </SidebarProvider>
    );
}