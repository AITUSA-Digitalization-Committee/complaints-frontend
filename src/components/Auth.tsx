'use client'

import { useAuth } from "@/hooks/student";
import { ApiResponse, Student } from "@/types";
import { ReactNode, useEffect, useState } from "react";
import xior from "xior";
import Loading from "./Loading";

interface AuthProps {
    children?: ReactNode
}

function Auth({ children }: AuthProps) {
    const { student, setStudent } = useAuth();
    
    const [token, setToken] = useState("");

    { /* Получаем token */ }
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {

        if (event.data.type === "INIT") {
            console.log("Received token:", event.data.data)
            setToken(event.data.data);
        }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

  { /* Получаем студента */ }
  const fetchStudent = async () => {

    if (!token) {
      return;
    }

    await xior.get<ApiResponse<Student>>('https://api.yeunikey.dev/v1/auth/profile', {
        headers: {
            Authorization: 'Bearer ' + token
        }
        }).then((response) => {

        if (response.data.statusCode == 400) {
            return;
        }
            setStudent(response.data.data);
        }).then(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchStudent();
    }, [token])
    
    return (
        <>
            {student
            ? (
                <>
                    {children}
                </>
            )
            : (
                <Loading className="w-full h-dvh"></Loading>
            )}
        </>
    );
}

export default Auth;