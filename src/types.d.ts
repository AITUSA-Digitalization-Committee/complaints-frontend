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

export {
    Student,
    ApiResponse,
    ICategory
 }