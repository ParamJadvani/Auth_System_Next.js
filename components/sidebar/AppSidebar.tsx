// components/sidebar/AppSidebar.tsx
"use client";

import { usePathname } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from 'next/link';
import { menuItems } from '@/constants/menuItems';
import Image from 'next/image';
import authStore from '@/store/authStore';
import { LucideUser } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function AppSidebar() {
    const pathname = usePathname();
    const userData = authStore().user
    return (
        <Sidebar side='left' collapsible='none' variant='inset' className='bg-white min-h-screen sticky top-0 border-r-2'>
            <SidebarHeader>
                <div className='flex items-center justify-between'>
                    {
                        userData?.company[0]?.logo && (
                            <Image
                                src={userData?.company[0]?.logo_url}
                                alt={userData?.company[0]?.name}
                                width={60}
                                height={60}
                            />
                        ) || (
                            <span className="text-2xl font-bold text-gray-600">
                                <LucideUser className="w-8 h-8 text-gray-500" />
                            </span>
                        )
                    }
                    <span className="text-xl font-bold">
                        Payroll
                    </span>
                </div>
                <Separator className='my-2 mt-6 border-gray-600/50' />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map(({ title, url, icon: Icon }) => {
                                const isActive = pathname === url;
                                return (
                                    <SidebarMenuItem key={title}>
                                        <SidebarMenuButton
                                            asChild
                                            className={isActive ? "bg-gray-100" : ""}
                                        >
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