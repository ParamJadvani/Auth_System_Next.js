// components/sidebar/AppSidebar.tsx
"use client";

import { usePathname } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from 'next/link';
import { menuItems } from '@/constants/menuItems';

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar side='left' collapsible='none' variant='inset' className='bg-white min-h-screen sticky top-0 border-r-2'>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map(({ title, url, icon: Icon }) => {
                                const isActive = pathname === url;
                                return (
                                    <SidebarMenuItem key={title}>
                                        <SidebarMenuButton asChild className={isActive ? "bg-gray-100" : ""}>
                                            <Link href={url}>
                                                <Icon />
                                                <span>{title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}