import { ICategory } from "@/types";
import { create } from "zustand";

type CategoryType = {
    categories: ICategory[];

    setCategories: (categories: ICategory[]) => void;
};

export const useCategories = create<CategoryType>((set) => ({
    categories: [],

    setCategories: (categories) => set({
        categories: categories
    }),
}));