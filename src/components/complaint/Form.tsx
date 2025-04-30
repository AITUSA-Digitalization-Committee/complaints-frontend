'use client'

import { api } from "@/api/instance";
import { useAuth } from "@/hooks/student";
import { ApiResponse } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

function Form() {

    const { categoryId } = useParams();
    const router = useRouter()
    const { student } = useAuth();

    const textRef = useRef<HTMLTextAreaElement>(null);
    const [isError, setError] = useState<boolean>(false);

    const sendForm = async () => {
        if (textRef.current?.value == "") {
            setError(true);
            toast.error('Заполните все поля')
            setTimeout(() => {
                setError(false);
            }, 3 * 1000);
            return;
        }

        const body = {
            "barcode": student?.barcode,
            "category_id": categoryId,
            "message": textRef.current?.value
        }

        await api.post<ApiResponse<undefined>>('/complaints', body)
            .then(({ data: response }) => {

                if (response.statusCode != 200) {
                    toast.error(response.message);
                    return;
                }

                router.push('/');
                router.refresh()

                toast.success('Вы успешно отправили жалобу')

            })
    }

    return (
        <div className="test">
            <div className='text-dark text-2xl font-semibold mt-8 mb-3'>Подробное описание вашей <br /> проблемы</div>

            <textarea
                ref={textRef}
                placeholder="Опишите проблему..."
                className={`w-full min-h-48 p-6 bg-muted rounded-2xl ${isError ? 'outline-2 outline-red-600 focus:outline-red-600' : 'focus:outline-primary'}`}
            />
            <button
                onClick={sendForm}
                className={`mt-6 w-full flex justify-center items-center text-white rounded-2xl py-3 cursor-pointer ${isError ? 'bg-red-600' : 'bg-primary'}`}
            >
                Отправить
            </button>
        </div>
    );
}

export default Form;