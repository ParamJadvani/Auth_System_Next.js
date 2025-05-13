"use client";

import API from "@/lib/axios";
import { LoginValues, RegisterValues, ResetPasswordValues } from "@/lib/validations/auth";
import { removeToken, setToken } from "@/lib/cookies";
import authStore from "@/store/authStore";
import { IUser } from "@/types/user";
import useNavigation from "@/hooks/useNavigation";
import { HOME_PAGE, LOGIN_PAGE } from "@/constants/redirect";

export default function useAuth() {
    const setUserInStore = authStore.getState().setUser;
    const pushPath = useNavigation().pushPath;

    const register = async (data: RegisterValues): Promise<void> => {
        try {
            await API.post("/auth/register", data);
            login(data);
        } catch {}
    };

    const login = async (data: LoginValues): Promise<void> => {
        try {
            const res = await API.post("/auth/login", data);
            await setToken("auth_token", res.data.token);
            await fetchUser();
            pushPath(HOME_PAGE);
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
            pushPath(LOGIN_PAGE);
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
            pushPath(HOME_PAGE);
        } catch {}
    };

    const forgotPassword = async (data: LoginValues): Promise<void> => {
        try {
            await API.post("/auth/password/forgot", data);
            pushPath(LOGIN_PAGE);
        } catch {}
    };

    const resetPassword = async (data: ResetPasswordValues, url: string): Promise<void> => {
        try {
            await API.post(url, data);
            pushPath(LOGIN_PAGE);
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
