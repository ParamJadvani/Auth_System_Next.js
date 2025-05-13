// lib/cookies.ts
"use server";

import { HOME_PAGE } from "@/constants/redirect";
import { cookies } from "next/headers";

export const setToken = async (key: string, token: string) => {
    (await cookies()).set(key, token, {
        path: HOME_PAGE,
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
};

export const removeToken = async (token: string) => {
    (await cookies()).delete(token);
};

export const getToken = async (token: string) => {
    return (await cookies()).get(token)?.value ?? null;
};
