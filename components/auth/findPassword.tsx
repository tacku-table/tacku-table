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
        alert("이메일을 발송했습니다.");
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
    <div className="w-[420px] m-auto py-60">
      <div className="text-center mb-10">
        <h3 className="text-4xl font-bold text-center mb-4">비밀번호 찾기</h3>
        <p>비밀번호를 찾고자 하는 이메일을 입력해주세요.</p>
        <p>비밀번호 재설정을 위한 이메일을 보내드리겠습니다.</p>
      </div>
      <h6 className="font-semibold text-base float-left">이메일</h6>
      <input
        id="email"
        type="email"
        placeholder="Example@example.com"
        ref={emailRef}
        value={email}
        onChange={onChangeEmail}
        className="register-input w-full h-10 border-1 border-mono60  text-input mb-10"
      />
      <button
        type="submit"
        onClick={handleResetPassword}
        className="bg-brand100 text-white h-[40px] w-full mb-3"
      >
        이메일 발송
      </button>
      {emailError || (
        <div className="text-red100 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <p>
            {email === ""
              ? "이메일을 입력하세요"
              : "이메일형식에 맞게 입력해주세요"}
          </p>
        </div>
      )}
    </div>
  );
};
export default FindPassword;
