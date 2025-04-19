'use client'

import { api } from "@/api/instance";
import { ICategory, ApiResponse } from "@/types";
import { useState, useEffect } from "react";
import Category from "./Category";

function Categories() {

    const [categories, setCategories] = useState<ICategory[]>([])

    const fetchCategories = async () => {
        await api.get<ApiResponse<ICategory[]>>('/categories')
            .then((response) => {
                if (response.data.statusCode != 200) {
                    return;
                }
                setCategories(response.data.data);
            })
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <div className="flex flex-col gap-2">
            {categories.map(cat => (
                <Category key={cat.id} category={cat}></Category>
            ))}
        </div>
    );
}

export default Categories;