interface ApiResponse<T> {
    statusCode: number,
    message?: string,
    data: T
}

interface Student {
    token: string,

    barcode: number,
    name: string,
    surname: string,

    group: {
        name: string
    }
}

interface ICategory {
    id: number,
    title: string,
    description: string,
    answer: string,
}

type IComplaint = {
    id: string;
    message: string;
    answer: {
        String: string,
        Valid: boolean
    };
    barcode: number;
    category: ICategory,
    created_at: string;
    updated_at: string;
    status: "pending" | "approved" | "rejected";
};
export {
    Student,
    ApiResponse,
    ICategory,
    IComplaint,
}
