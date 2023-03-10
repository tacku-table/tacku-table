import FindPassword from "@/components/auth/findPassword";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Seo from "../../components/layout/Seo";

const LoginPage = () => {
    const router = useRouter();
    const [status, setStatus] = useState<string>("login");
    const { headerstatus } = router.query;
    return (
        <div className="h-screen flex justify-center items-center">
            <Seo title="로그인" />
            {headerstatus ? (
                <div className="grid items-center mx-auto mt-14 w-full max-w-[420px]">
                    <Register />
                </div>
            ) : (
                <div className="grid items-center mx-auto mt-14 w-full max-w-[420px]">
                    {status === "login" && (
                        <Login setStatus={setStatus} status={status} />
                    )}
                    {status === "signUp" && <Register />}
                    {status === "searchPW" && <FindPassword />}
                </div>
            )}
        </div>
    );
};

export default LoginPage;
