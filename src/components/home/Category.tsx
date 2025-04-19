import { ICategory } from "@/types";
import { useRouter } from "next/navigation";

interface CategoryProps {
    category: ICategory
}

function Category({ category }: CategoryProps) {
    const router = useRouter();

    const handleClick = (id: number) => {
        router.push(`/complaint/${id}`);
    };

    return (
        <div
            className="bg-muted rounded-2xl p-6"
            onClick={() => handleClick(category.id)}
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

export default Category;