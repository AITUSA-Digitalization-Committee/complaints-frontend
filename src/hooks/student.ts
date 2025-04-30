import { Student } from "@/types";
import { create } from "zustand";

type AuthType = {
    student: Student | null;
    canSubmit: boolean;
    token: string;

    setToken: (token: string) => void;
    setStudent: (student: Student | null) => void;
    setSubmit: (submit: boolean) => void;
};

export const useAuth = create<AuthType>((set) => ({
    student: null,
    canSubmit: true,
    token: "",

    setToken: (token) => set({
        token: token
    }),

    setStudent: (user) => set({
        student: user
    }),

    setSubmit: (submit) => set({
        canSubmit: submit
    }),
}));