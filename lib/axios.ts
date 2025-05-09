import { getToken } from "@/lib/cookies";
import axios from "axios";

const API = axios.create({
    baseURL: "https://adonis-payroll.s.arrangic.com",
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use(async (config) => {
    const token = await getToken("auth_token");
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
