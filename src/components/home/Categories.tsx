'use client'

import Category from "./Category";
import { useCategories } from "@/hooks/categories";

function Categories() {

    const { categories } = useCategories();

    return (
        <div className="flex flex-col gap-2">
            {categories.map(cat => (
                <Category key={cat.id} category={cat}></Category>
            ))}
        </div>
    );
}

export default Categories;