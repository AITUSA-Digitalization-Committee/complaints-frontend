import { Student } from "@/types";
import { create } from "zustand";

type AuthType = {
    student: Student | null;

    setStudent: (student: Student | null) => void;
};

export const useAuth = create<AuthType>((set) => ({
    student: null,

    setStudent: (user) => set({
        student: user
    }),
}));