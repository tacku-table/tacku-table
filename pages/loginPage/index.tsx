import FindPassword from "@/components/auth/findPassword";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import React, { useState } from "react";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState("login");
  const { headerstatus } = router.query;
  console.log(router.query);
  return (
    <div>
      {headerstatus ? (
        <div className="grid items-center mx-auto mt-14">
          <Register />
        </div>
      ) : (
        <div className="grid items-center mx-auto mt-14">
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
