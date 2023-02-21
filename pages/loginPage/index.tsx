import FindPassword from "@/components/auth/findPassword";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import React, { useState } from "react";

const LoginPage = () => {
    const [status, setStatus] = useState("login");
    return (
        <div className="grid items-center mx-auto mt-14">
            {status === "login" && (
                <Login setStatus={setStatus} status={status} />
            )}
            {status === "signUp" && <Register />}
            {status === "searchPW" && <FindPassword />}
        </div>
    );
};

export default LoginPage;
