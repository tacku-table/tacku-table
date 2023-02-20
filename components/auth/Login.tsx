import React, { useRef, useState } from "react";
import { authService } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { emailRegex, pwRegex } from "@/util";
import { useRouter } from "next/router";

const Login = ({ setStatus, status }: { setStatus: any; status: string }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  //   const router = useRouter();
  //   const goToMain = () => {
  //     router.push("/mainPage");
  //   };

  // 유효성 검사
  const validateInputs = () => {
    if (!email) {
      alert("email을 입력해주세요.");
      emailRef.current!.focus();
      return true;
    }
    if (!pw) {
      alert("password를 입력해주세요.");
      pwRef.current!.focus();
      return true;
    }
    const matchedEmail = email.match(emailRegex);
    const matchedPw = pw.match(pwRegex);

    if (matchedEmail === null) {
      alert("이메일 형식에 맞게 입력해 주세요.");
      emailRef.current!.focus();
      return true;
    }
    if (matchedPw === null) {
      alert("비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.");
      pwRef.current!.focus();
      return true;
    }
  };

  //로그인 함수
  const handleLogin = () => {
    // 유효성 검사 함수
    if (validateInputs()) {
      return;
    }

    // 파이어베이스 로그인 요청
    signInWithEmailAndPassword(authService, email, pw)
      .then(() => {
        alert("로그인 성공");
        setEmail("");
        setPw("");
        sessionStorage.setItem("User", JSON.stringify(authService.currentUser));
        location.href = "/mainPage";
      })
      .catch((err) => {
        console.log("err.message:", err.message);
        if (err.message.includes("user-not-found")) {
          alert("회원이 아닙니다. 회원가입을 먼저 진행해 주세요.");
        }
        if (err.message.includes("wrong-password")) {
          alert("비밀번호가 틀렸습니다.");
        }
      });
  };
  return (
    <div className="bg-slate-300 w-2/5 h-4/5 p-10 rounded-md shadow-md mx-auto flex flex-col bd-3">
      <h3 className="text-center">😍 로그인 페이지(컴포넌트)입니다😍 </h3>
      <h6>이메일</h6>
      <input
        id="email"
        type="email"
        placeholder="이메일을 입력하세요"
        ref={emailRef}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-150 p-2.5"
      ></input>
      <br />
      <h6>비밀번호</h6>
      <input
        id="pw"
        type="password"
        placeholder="비밀번호 설정"
        ref={pwRef}
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-150 p-2.5"
      ></input>
      <br />
      <button
        type="button"
        style={{ border: "1px solid black" }}
        onClick={handleLogin}
        className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        로그인하기
      </button>
      <br />
      {status === "login" ? (
        <div>
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
      ) : (
        ""
      )}
    </div>
  );
};

export default Login;
