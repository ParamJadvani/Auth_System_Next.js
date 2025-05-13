import { BadgeIndianRupeeIcon, CalendarIcon, CalendarX2Icon, CircleUserIcon, FileClockIcon, HandCoinsIcon, Home, KeyRoundIcon, Settings, TagsIcon, UserIcon, Users2Icon } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from 'next/link'

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "#",
        icon: Home,
    },
    {
        title: "Admin",
        url: "#",
        icon: CircleUserIcon,
    },
    {
        title: "Credentials",
        url: "#",
        icon: KeyRoundIcon,
    },
    {
        title: "Employees",
        url: "#",
        icon: Users2Icon,
    },
    {
        title: "Leaves",
        url: "#",
        icon: CalendarIcon,
    },
    {
        title: "pay",
        url: "#",
        icon: BadgeIndianRupeeIcon,
    },
    {
        title: "Interviewees",
        url: "#",
        icon: UserIcon,
    },
    {
        title: "Holiday",
        url: "#",
        icon: CalendarX2Icon,
    },
    {
        title: "Reports",
        url: "#",
        icon: FileClockIcon,
    },
    {
        title: "Loans",
        url: "#",
        icon: HandCoinsIcon,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
    {
        title: "Tags",
        url: "#",
        icon: TagsIcon,
    },

]

export function AppSidebar() {
    return (
        <Sidebar side='left' collapsible='none' className='bg-white border-r-2'>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map(({ title, url, icon: Icon }) => (
                                <SidebarMenuItem key={title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={url}>
                                            <Icon />
                                            <span>{title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
