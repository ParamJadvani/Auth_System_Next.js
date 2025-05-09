"use client";
import authStore from "@/store/authStore";
import { IUserStore } from "@/types/user";
import { useRef } from "react";

export default function InitializeUser({
    user,
    children,
}: {
    user: IUserStore;
    children: React.ReactNode;
}) {
    const ref = useRef(false);

    if (!ref.current) {
        authStore.setState({ user });
        ref.current = true;
    }

    return children;
}
