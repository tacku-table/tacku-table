import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { authService } from "@/config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { emailRegex, pwRegex } from "@/util";

const FindPassword = () => {
  // useRef로 취득하는 DOM은 최초 mount되기 전엔 null이다
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(true);
  //뒤로가기 누르면 로그인 창으로 이동
  useEffect(() => {
    window.history.pushState(null, "null", document.URL);
    console.log("document.URL:", document.URL);
    window.addEventListener("popstate", function (event) {
      const result = window.confirm("정말 나가시겠습니까?");
      if (result) {
        window.location.replace(`/loginPage`);
      }
      if (!result) {
        return false;
      }
    });
  }, []);

  // email password 유효성검사
  const changePassword = () => {
    if (!email) {
      setEmailError(false);
      emailRef.current!.focus();
      return true;
    } else if (!email.match(emailRegex)) {
      emailRef.current!.focus();
      return true;
    }
  };

  // 비밀번호 재설정 메일 보내기
  const handleResetPassword = (e: any) => {
    e.preventDefault();
    if (changePassword()) {
      return;
    }
    sendPasswordResetEmail(authService, email)
      .then((data) => {
        alert("보내기 성공");
      })
      .catch((error) => {
        if (error.message.includes("auth/user-not-found")) {
          alert("회원이 아님.");
          return;
        }
        console.log(error.message);
      });
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="bg-slate-300 w-2/5 h-4/5 p-10 rounded-md shadow-md mx-auto flex flex-col bd-3">
      <input
        id="email"
        type="email"
        placeholder="Example@example.com"
        ref={emailRef}
        value={email}
        onChange={onChangeEmail}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-150 p-2.5"
      />
      {emailError || (
        <div>
          {email === ""
            ? "이메일을 입력하세요"
            : "이메일형식에 맞게 입력해주세요"}
        </div>
      )}
      <button
        type="submit"
        onClick={handleResetPassword}
        className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        이메일 인증
      </button>
    </div>
  );
};
export default FindPassword;
