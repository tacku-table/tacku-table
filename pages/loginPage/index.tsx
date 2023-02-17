import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Header from "@/components/layout/Header";
import React, { useState } from "react";

const LoginPage = () => {
  const [status, setStatus] = useState("login");
  return (
    <div>
      Login Page입니다.
      {status === "login" && <Login setStatus={setStatus} status={status} />}
      {status === "signUp" && <Register />}
      {status === "searchPW" && <Header />}
    </div>
  );
};

export default LoginPage;
