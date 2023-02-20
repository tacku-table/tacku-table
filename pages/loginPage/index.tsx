import FindPassword from "@/components/auth/findPassword";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Header from "@/components/layout/Header";
import React, { useState } from "react";

const LoginPage = () => {
  const [status, setStatus] = useState("login");
  return (
    <div className="grid items-center mx-auto h-screen w-screen">
      {status === "login" && <Login setStatus={setStatus} status={status} />}
      {status === "signUp" && <Register />}
      {status === "searchPW" && <FindPassword />}
    </div>
  );
};

export default LoginPage;
