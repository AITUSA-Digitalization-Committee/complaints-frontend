'use client'

import Accordion from "./ui/Accordion";
import { toast } from "react-toastify";

function ComplaintAccordion() {

    const complaints = [
        {
            id: 1,
            text: 'Привет, я из группы SE-2401, Рауан Кунтуганов пишу заявление на дальше лень писать'
        },
        {
            id: 2,
            text: "Это текст рыба уеухжецхжеъхфде ъхфдез фыдзхе длфхылещфзоые шфыеш фыез фыоешзофыеш зы ез е"
        },
        {
            id: 3,
            text: "У рауана сейчас трусы Calvin Kelvin на момент написания этого текста."
        }
    ]

    return (
        <div>
            <Accordion
                title="Мои жалобы"
            >
                <div className="px-6 flex flex-col gap-2">
                    {complaints.map((complaints, i) => {
                        return (
                            <div key={i} className="bg-white rounded-2xl p-3 min-h-24 relative overflow-hidden"
                                onClick={() => {
                                    toast.warn('Ещё в разработке...')
                                }}
                            >
                                {/* <div className="font-semibold text-lg">
                                    {'Жалоба #' + complaints.id}
                                </div> */}
                                <div className="absolute -bottom-2 left-0 text-5xl font-black opacity-10">
                                    {'#' + complaints.id}
                                </div>
                                <div className="z-10 line-clamp-2 text-dark mt-1 text-sm">
                                    {complaints.text}
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