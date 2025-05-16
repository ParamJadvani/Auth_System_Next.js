"use client";

import { Navbar } from '@/components/navbar/Navbar';
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { menuItems } from '@/constants/menuItems';
import { usePathname } from 'next/navigation';

export default function ParentSidebar({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const activeItem = menuItems.find(item => item.url === pathname);
    const title = activeItem ? activeItem.title : "Dashboard";
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className='flex flex-1 flex-col bg-gray-200/50'>
                <header className='sticky top-0 z-10 flex items-center justify-between bg-white  border-b border-gray-400/50'>
                    <Navbar title={title} />
                </header>
                <main className='p-4'>
                    {children}
                </main>
            </div>
        </SidebarProvider>

    );
}
