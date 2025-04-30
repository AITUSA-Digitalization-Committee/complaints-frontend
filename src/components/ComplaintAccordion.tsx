'use client'

import { useEffect, useState } from "react";
import Accordion from "./ui/Accordion";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/student";
import { api } from "@/api/instance";
import { ApiResponse } from "@/types";

function ComplaintAccordion() {

    const { token } = useAuth();
    const [complaints, setComplaints] = useState<{ id: string, message: string }[]>([]);

    const fetchComplaints = async () => {
        await api.get<ApiResponse<{ id: string, message: string }[]>>('/complaints/by-token', {
            params: {
                token: token
            }
        }).then(({ data }) => {

            if (data.statusCode != 200) {
                toast.error(data.message);
                return;
            }

            if (data.data == null) {
                return;
            }
            setComplaints(data.data);
        })
    }


    useEffect(() => {
        if (token == null) {
            return;
        }
        fetchComplaints();
    }, [token])

    return (
        <div>
            <Accordion
                title="Мои жалобы"
            >
                <div className="px-6 flex flex-col gap-2">
                    {complaints.map((complaints, i) => {
                        return (
                            <div key={i} className="bg-white rounded-2xl p-3 min-h-20 relative overflow-hidden"
                                onClick={() => {
                                    toast.warn('Ещё в разработке...')
                                }}
                            >
                                {/* <div className="font-semibold text-lg">
                                    {'Жалоба #' + complaints.id}
                                </div> */}
                                <div className="absolute -bottom-2 left-0 text-5xl font-black opacity-10">
                                    {'#' + (i + 1)}
                                </div>
                                <div className="z-10 line-clamp-2 text-dark mt-1 text-sm">
                                    {complaints.message}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Accordion>
        </div>
    );
}
export default ComplaintAccordion;