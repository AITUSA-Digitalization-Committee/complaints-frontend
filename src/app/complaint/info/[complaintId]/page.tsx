'use client';

import View from '@/components/View';
import {useParams, useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {ApiResponse, IComplaint} from '@/types';
import {api} from '@/api/instance';
import {toast} from 'react-toastify';
import {useAuth} from '@/hooks/student';

export default function ComplaintInfoPage() {
    const router = useRouter();
    const {complaintId} = useParams();
    const {token} = useAuth();
    const searchParams = useSearchParams();
    const position = searchParams.get('pos');
    const [complaint, setComplaint] = useState<IComplaint>();

    useEffect(() => {
        if (!complaintId || !token) return;

        const fetchComplaint = async () => {
            try {
                const {data} = await api.get<ApiResponse<IComplaint>>(`/complaints/${complaintId}`);

                if (data.statusCode !== 200) {
                    toast.error(data.message);
                    return;
                }

                setComplaint(data.data);
            } catch (e) {
                console.error("Ошибка при загрузке жалобы:", e);
                toast.error("Не удалось загрузить жалобу");
            }
        };

        fetchComplaint();
    }, [complaintId, token]);

    const revokeComplaint = async () => {
        try {
            const {data} = await api.delete<ApiResponse<{ message: string }>>(
                `/complaints/${complaintId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.statusCode !== 200) {
                toast.error(data.message);
                return;
            }

            toast.success("Жалоба отозвана");
            setComplaint(undefined);
            router.push('/');
            router.refresh()
        } catch (error) {
            console.error("Ошибка при отзыве жалобы:", error);
            toast.error("Ошибка при отзыве жалобы");
        }
    };

    return (
        <View>
            <div className="text-dark text-2xl font-semibold mb-4">
                Жалоба #{position}
            </div>

            {complaint ? (
                <div className="bg-white rounded-2xl shadow p-6 space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">Сообщение:</h2>
                        <p className="text-gray-900">{complaint.message}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">Ответ:</h2>
                        <p className="text-gray-900">{complaint.answer.String || "Ещё не рассмотрено"}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">Категория:</h2>
                        <p className="text-gray-900">{complaint.category.title}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">Статус:</h2>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium 
                            ${complaint.status === 'approved' ? 'bg-green-100 text-green-800' :
                            complaint.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'}`}>
                            {complaint.status}
                        </span>
                    </div>

                    <div className="text-sm text-gray-500">
                        Создано: {new Date(complaint.created_at).toLocaleString()}
                        <br/>
                    </div>

                    <button
                        onClick={revokeComplaint}
                        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-xl"
                    >
                        Отозвать жалобу
                    </button>
                </div>
            ) : (
                <div className="text-gray-500">Загрузка...</div>
            )}
        </View>
    );
}
