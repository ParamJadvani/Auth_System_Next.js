"use server";
import API from "@/lib/axios";

export const fetchUserRepository = async () => {
    try {
        const res = await API.get("/auth/user");
        return res.data;
    } catch {}
};
