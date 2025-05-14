// constants/menuItems.ts
import {
    Home,
    CircleUserIcon,
    KeyRoundIcon,
    Users2Icon,
    CalendarIcon,
    BadgeIndianRupeeIcon,
    UserIcon,
    CalendarX2Icon,
    FileClockIcon,
    HandCoinsIcon,
    Settings,
    TagsIcon,
} from "lucide-react";
import { ADMIN_PAGE, HOME_PAGE } from "@/constants/redirect";

export const menuItems = [
    {
        title: "Dashboard",
        url: HOME_PAGE,
        icon: Home,
    },
    {
        title: "Admin",
        url: ADMIN_PAGE,
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
];
