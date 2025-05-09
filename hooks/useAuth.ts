import API from "@/lib/axios";
import axios from "axios";
import { LoginValues, RegisterValues, ResetPasswordValues } from "@/lib/validations/auth";
import { getToken, removeToken, setToken } from "@/lib/cookies";
import authStore from "@/store/authStore";
import { IUser } from "@/types/user";
import { handleAPIError } from "@/utils/apiErrorHandling";

export default function useAuth() {
    const setUserInStore = authStore.getState().setUser;

    const register = async (
        data: RegisterValues
    ): Promise<{ error: boolean; message: string[] }> => {
        try {
            const res = await API.post("/auth/register", data);
            login(data);
            return { error: false, message: [res.data.success] };
        } catch (err) {
            return handleAPIError(err, "Error in Registration.Please try again.") as {
                error: boolean;
                message: string[];
            };
        }
    };

    const login = async (data: LoginValues): Promise<{ error: boolean; message: string }> => {
        try {
            const res = await API.post("/auth/login", data);
            await setToken("auth_token", res.data.token);
            await fetchUser();
            return { error: false, message: "Login Successful." };
        } catch (err) {
            return handleAPIError(err, "Error in Login. Please try again.") as {
                error: boolean;
                message: string;
            };
        }
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
        await API.post("/auth/logout");
        await removeToken("auth_token");
        authStore.setState({ user: null });
    };

    const resendEmailVerification = async (): Promise<{ error: boolean; message: string }> => {
        try {
            const res = await API.request({
                method: "POST",
                url: "/auth/email/verify/resend",
            });
            return { error: false, message: res.data.success };
        } catch (err) {
            return handleAPIError(
                err,
                "Can't Resend Email Verification Link. Please try again."
            ) as {
                error: boolean;
                message: string;
            };
        }
    };

    const verifyEmail = async (url: string): Promise<{ error: boolean; message: string }> => {
        try {
            const token = await getToken("auth_token");
            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return { error: false, message: res.data.success };
        } catch (err) {
            return handleAPIError(err, "Error in Email Verification. Please try again.") as {
                error: boolean;
                message: string;
            };
        }
    };

    const forgotPassword = async (
        data: LoginValues
    ): Promise<{ error: boolean; message: string }> => {
        try {
            const res = await API.post("/auth/password/forgot", data);
            return { error: false, message: res.data.success };
        } catch (err) {
            return handleAPIError(err, "Error in Forgot Password. Please try again.") as {
                error: boolean;
                message: string;
            };
        }
    };

    const resetPassword = async (
        data: ResetPasswordValues,
        url: string
    ): Promise<{ error: boolean; message: string }> => {
        try {
            const res = await axios.post(url, data);
            return { error: false, message: res.data.success };
        } catch (err) {
            return handleAPIError(err, "Error in Reset Password. Please try again.") as {
                error: boolean;
                message: string;
            };
        }
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
