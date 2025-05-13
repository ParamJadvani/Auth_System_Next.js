"use client";

import { AppSidebar } from "@/components/sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ParentSidebar({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            {/* Wrapper with white background */}
            <div className="bg-white">
                <AppSidebar />
            </div>

            <main className="w-full">
                {children}
            </main>
        </SidebarProvider>
    );
}
