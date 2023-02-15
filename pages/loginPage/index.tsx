import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Header from "@/components/layout/Header";
import Link from "next/link";
import React, { useState } from "react";

const LoginPage = () => {
    const [status, setStatus] = useState("login");
    return (
        <div>
            Login Page입니다.
            {status === "login" && <Login />}
            {status === "signUp" && <Register />}
            {status === "searchPW" && <Header />}
            <button
                type="button"
                onClick={() => {
                    setStatus("signUp");
                }}
            >
                회원가입하기
            </button>
            <button
                type="button"
                onClick={() => {
                    setStatus("searchPW");
                }}
            >
                비밀번호 찾기
            </button>
        </div>
    );
};

export default LoginPage;
