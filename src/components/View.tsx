import { ReactNode } from "react";

interface ViewProps {
    className?: string,
    children?: ReactNode
}

function View({ className, children }: ViewProps) {
    return (
        <div className={`p-6 ${className}`}>
            {children}
        </div>
    );
}

export default View;