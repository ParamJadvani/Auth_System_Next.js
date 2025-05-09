import { IUserStore } from "@/types/user";
import { create } from "zustand";

type authStore = {
    user: IUserStore | null;
    setUser: (user: IUserStore | null) => void;
};

const authStore = create<authStore>(() => ({
    user: null,
    setUser: (user: IUserStore | null) => {
        authStore.setState({ user });
    },
}));

export default authStore;
