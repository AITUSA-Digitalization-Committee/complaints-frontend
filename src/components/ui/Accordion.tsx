import React, { useRef, useState } from "react";

type AccordionProps = {
    title: string;
    children: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const toggleAccordion = () => setIsOpen(!isOpen);

    return (
        <div className="bg-muted rounded-2xl">
            <div
                onClick={toggleAccordion}
                className="w-full px-6 py-4 flex justify-between items-center font-semibold"
            >
                <div className="text-xl">{title}</div>
                <div className="text-xl opacity-50">{isOpen ? "−" : "+"}</div>
            </div>

            <div
                ref={contentRef}
                style={{
                    maxHeight: isOpen ? contentRef.current?.scrollHeight : 0,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                }}
            >
                <div className="pb-3">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Accordion;
