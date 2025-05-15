"use client";

import API from "@/lib/axios";
import { ILoginValues, IRegisterValues, IResetPasswordValues } from "@/types/auth";
import { removeToken, setToken } from "@/lib/cookies";
import authStore from "@/store/authStore";
import { IUser } from "@/types/user";
import { HOME_PAGE, LOGIN_PAGE } from "@/constants/redirect";
import { useRouter } from "next/navigation";

export default function useAuth() {
    const setUserInStore = authStore.getState().setUser;
    const router = useRouter();

    const register = async (data: IRegisterValues): Promise<void> => {
        try {
            await API.post("/auth/register", data);
            login(data);
        } catch {}
    };

    const login = async (data: ILoginValues): Promise<void> => {
        try {
            const res = await API.post("/auth/login", data);
            await setToken("auth_token", res.data.token);
            await fetchUser();
            router.push(HOME_PAGE);
        } catch {}
    };

    const fetchUser = async (): Promise<IUser | null> => {
        try {
            const res = await API.get("/auth/user");
            setUserInStore(res.data);
            return res.data.user;
        } catch {
            return null;
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await API.post("/auth/logout");
            await removeToken("auth_token");
            authStore.setState({ user: null });
            router.push(LOGIN_PAGE);
        } catch {}
    };

    const resendEmailVerification = async (): Promise<void> => {
        try {
            await API.request({
                method: "POST",
                url: "/auth/email/verify/resend",
            });
        } catch {}
    };

    const verifyEmail = async (url: string): Promise<void> => {
        try {
            await API.get(url);
            router.push(HOME_PAGE);
        } catch {}
    };

    const forgotPassword = async (data: ILoginValues): Promise<void> => {
        try {
            await API.post("/auth/password/forgot", data);
            router.push(LOGIN_PAGE);
        } catch {}
    };

    const resetPassword = async (data: IResetPasswordValues, url: string): Promise<void> => {
        try {
            await API.post(url, data);
            router.push(LOGIN_PAGE);
        } catch {}
    };

    return {
        register,
        login,
        fetchUser,
        logout,
        verifyEmail,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        isLoggedIn: Boolean(authStore.getState().user),
    };
}
