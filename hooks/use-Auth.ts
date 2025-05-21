"use client";

import API from "@/lib/axios";
import {
    IChangePasswordValues,
    ILoginValues,
    IRegisterValues,
    IResetPasswordValues,
} from "@/types/auth";
import { removeToken, setToken } from "@/lib/cookies";
import authStore from "@/store/authStore";
import { HOME_PAGE, LOGIN_PAGE } from "@/constants/redirect";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function useAuth() {
    const setUserInStore = authStore.getState().setUser;
    const router = useRouter();

    const fetchUser = useCallback(async (): Promise<void> => {
        try {
            const res = await API.get("/auth/user");
            setUserInStore(res.data);
        } catch {}
    }, [setUserInStore]);

    const login = useCallback(
        async (data?: ILoginValues, url: string = "/auth/login"): Promise<void> => {
            try {
                const res = await API.post(url, data);
                await setToken("auth_token", res.data.token);
                await fetchUser();
                router.push(HOME_PAGE);
            } catch {}
        },
        [fetchUser, router]
    );

    const register = async (data: IRegisterValues): Promise<void> => {
        try {
            await API.post("/auth/register", data);
            await login(data);
        } catch {}
    };

    const logout = useCallback(async (): Promise<void> => {
        try {
            await API.post("/auth/logout");
            await removeToken("auth_token");
            authStore.setState({ user: null });
            router.push(LOGIN_PAGE);
        } catch {}
    }, [router]);

    const resendEmailVerification = useCallback(async (): Promise<void> => {
        try {
            await API.post("/auth/email/verify/resend");
        } catch {}
    }, []);

    const verifyEmail = useCallback(
        async (url: string): Promise<void> => {
            try {
                await API.get(url);
                router.push(HOME_PAGE);
            } catch {}
        },
        [router]
    );

    const forgotPassword = useCallback(async (data: ILoginValues): Promise<void> => {
        try {
            await API.post("/auth/password/forgot", data);
        } catch {}
    }, []);

    const resetPassword = useCallback(
        async (data: IResetPasswordValues, url: string): Promise<void> => {
            try {
                await API.post(url, data);
                router.push(LOGIN_PAGE);
            } catch {}
        },
        [router]
    );

    const changePassword = useCallback(async (data: IChangePasswordValues): Promise<boolean> => {
        try {
            await API.post("/auth/change-password", data);
            return false;
        } catch {
            return true;
        }
    }, []);

    return {
        register,
        login,
        fetchUser,
        logout,
        verifyEmail,
        forgotPassword,
        resetPassword,
        changePassword,
        resendEmailVerification,
        isLoggedIn: Boolean(authStore.getState().user),
    };
}
