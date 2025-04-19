'use client'

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

function Form() {

    const router = useRouter()

    const textRef = useRef<HTMLTextAreaElement>(null);
    const [isError, setError] = useState<boolean>(false);

    const sendForm = async () => {
        if (textRef.current?.value == "") {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3 * 1000);
            return;
        }

        router.push('/');
        router.refresh()
    }

    return (
        <div className="test">
            <div className='text-dark text-2xl font-semibold mt-8 mb-3'>Подробное описание вашей <br/> проблемы</div>

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