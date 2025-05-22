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

// "use client";
// import { getCookie, setCookie, deleteCookie } from "cookies-next/client";
// import { HOME_PAGE } from "@/constants/redirect";

// export const setToken = (key: string, token: string) => {
//     setCookie(key, token, {
//         path: HOME_PAGE,
//         sameSite: "lax",
//         secure: true,
//         expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//     });
// };

// export const removeToken = (token: string) => {
//     deleteCookie(token);
// };

// export const getToken = (token: string) => {
//     return getCookie(token) ?? null;
// };

// "use server";
// import { getCookie, setCookie, deleteCookie } from "cookies-next/server";

// export const setToken = async (key: string, token: string) => {
//     await setCookie(key, token, {
//         path: "/",
//         sameSite: "lax",
//         secure: true,
//         expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//     });
// };

// export const removeToken = async (token: string) => {
//     await deleteCookie(token);
// };

// export const getToken = async (token: string) => {
//     return (await getCookie(token)) ?? null;
// };
