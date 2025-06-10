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
import {
    ADMIN_PAGE,
    CREDENTIALS_PAGE,
    EMPLOYEE_PAGE,
    HOLIDAY_PAGE,
    HOME_PAGE,
    LEAVES_PAGE,
    PAY_PAGE,
    REPORTS_PAGE,
    TAGS_PAGE,
} from "@/constants/redirect";

export const menuItems = [
    {
        title: "Dashboard",
        url: HOME_PAGE,
        icon: Home,
        secure: false,
    },
    {
        title: "Admin",
        url: ADMIN_PAGE,
        icon: CircleUserIcon,
        secure: true,
    },
    {
        title: "Credentials",
        url: CREDENTIALS_PAGE,
        icon: KeyRoundIcon,
        secure: false,
    },
    {
        title: "Employees",
        url: EMPLOYEE_PAGE,
        icon: Users2Icon,
        secure: true,
    },
    {
        title: "Leaves",
        url: LEAVES_PAGE,
        icon: CalendarIcon,
        secure: true,
    },
    {
        title: "pay",
        url: PAY_PAGE,
        icon: BadgeIndianRupeeIcon,
        secure: true,
    },
    {
        title: "Interviewees",
        url: "#",
        icon: UserIcon,
        secure: true,
    },
    {
        title: "Holiday",
        url: HOLIDAY_PAGE,
        icon: CalendarX2Icon,
        secure: true,
    },
    {
        title: "Reports",
        url: REPORTS_PAGE,
        icon: FileClockIcon,
        secure: true,
    },
    {
        title: "Loans",
        url: "#",
        icon: HandCoinsIcon,
        secure: true,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
        secure: true,
    },
    {
        title: "Tags",
        url: TAGS_PAGE,
        icon: TagsIcon,
        secure: true,
    },
];
