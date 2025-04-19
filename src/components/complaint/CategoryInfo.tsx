'use client'

import { api } from "@/api/instance";
import { ApiResponse, ICategory } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../Loading";

function CategoryInfo() {
    const { categoryId } = useParams();

    const [category, setCategory] = useState<ICategory | null>(null);
  
    const fetchCategory = async () => {
      await api.get<ApiResponse<ICategory>>('/categories/' + categoryId)
        .then((response) => {
          setCategory(response.data.data)
        })
    }
  
    useEffect(() => {
      fetchCategory();
    }, [])

    if (!category) {
        return <Loading className="w-full h-64 rounded-2xl bg-muted"/>
    }

    return (
        <div
            className="bg-muted rounded-2xl p-6 overflow-y-scroll h-64"
        >

            <div className="text-dark text-2xl font-semibold pb-3 cursor-pointer">
                {category.title}
            </div>

            {category.description.split('\n').map((line, index) => (
                line.trim() === ''
                    ? <br key={index} />
                    : <div key={index} className="text-dark-light-gray">{line}</div>
            ))}

        </div>
    );
}

export default CategoryInfo;