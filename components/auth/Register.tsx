import React, { useEffect, useRef, useState } from "react";
import { authService, dbService } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { emailRegex, pwRegex } from "@/util";
import { setDoc, doc } from "firebase/firestore";

const RegisterPage = () => {
  // useRef로 취득하는 DOM은 최초 mount되기 전엔 null이다
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const pwConfirmRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [agree, setAgree] = useState(false);

  // 브라우저 뒤로가기 버튼시 confirm창과 함께 "확인"클릭시 로그인 페이지로 이동하는 함수입니다.
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

  // 유효성검사
  const validInputs = () => {
    if (!email) {
      alert("이메일을 입력하세요");
      emailRef.current!.focus();
      return true;
    } else if (!email.match(emailRegex)) {
      alert("이메일형식에 맞게 입력해주세요");
      emailRef.current!.focus();
      return true;
    }

    if (!(pw || pwConfirm)) {
      alert("비밀번호 또는 비밀번호확인란이 비어있습니다");
      pwRef.current!.focus();
      return true;
    } else if (!pw.match(pwRegex)) {
      alert("비밀번호형식에 맞게 입력해주세요");
      pwRef.current!.focus();
      return true;
    } else if (pw !== pwConfirm) {
      alert("비밀번호 확인이 일치하지 않습니다");
      pwConfirmRef.current!.focus();
      return true;
    } else if (agree == false) {
      alert("개인정보취급 방침에 동의해주세요!");
      return true;
    }

    if (!nickname.trim()) {
      alert("닉네임을 입력하세요");
      nicknameRef.current!.focus();
      return true;
    }
  };

  // 회원가입
  const signUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (validInputs()) {
      return;
    }
    createUserWithEmailAndPassword(authService, email, pw)
      .then(async (data) => {
        console.log("회원 데이터", data.user.uid);
        // const docRef = data.user.uid;
        await setDoc(doc(dbService, "user", data.user.uid), {
          userId: data.user.uid,
          userNickname: nickname,
          userEmail: email,
          userPw: pw,
          userImg: "null",
        });
        await updateProfile(data.user, {
          displayName: nickname,
          photoURL: "null",
        });
        alert("회원가입성공! 로그인해주세요!");
        signOut(authService).then(() => {
          sessionStorage.clear();
          location.href = "/loginPage";
        });
        return data.user;
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message.includes("already-in-use")) {
          alert("이미 가입한 회원입니다.");
          return;
        }
      });
    setEmail("");
    setPw("");
    setPwConfirm("");
    setNickname("");
  };

  return (
    <div className="w-[420px] mx-auto mb-20 text-baseText">
      <form onSubmit={signUp} className="flex flex-col">
        <h2 className="text-2xl font-bold self-center">회원가입</h2>
        <label htmlFor="email" className="font-semibold mt-4">
          이메일
        </label>
        <input
          id="email"
          type="email"
          placeholder="Example@example.com"
          ref={emailRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
        ></input>
        <label htmlFor="pw" className="font-semibold mt-4">
          비밀번호
        </label>
        <input
          id="pw"
          type="password"
          placeholder="비밀번호 설정"
          ref={pwRef}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="register-input"
        ></input>
        <p className="mt-[5px] text-grayText text-xs">
          영문, 숫자, 특수기호 포함 최소 8자 이상
        </p>
        <label htmlFor="pwConfirm" className="font-semibold mt-4">
          비밀번호 확인
        </label>
        <input
          id="pwConfirm"
          type="password"
          placeholder="비밀번호 확인"
          ref={pwConfirmRef}
          value={pwConfirm}
          onChange={(e) => setPwConfirm(e.target.value)}
          className="register-input"
        ></input>
        <label htmlFor="nickname" className="font-semibold mt-4">
          닉네임
        </label>
        <input
          id="nickname"
          type="text"
          placeholder="닉네임 입력"
          maxLength={10}
          ref={nicknameRef}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="register-input"
        ></input>
        <p className="mt-[5px] text-grayText text-xs">최대 10자 이내</p>
        <div className="border border-border mt-7"></div>
        <div className="flex text-grayText text-xs mt-2">
          <input
            id="terms"
            type="checkbox"
            onClick={(event) => {
              const target = event.target as HTMLInputElement;
              setAgree(target.checked);
            }}
          />

          <label htmlFor="terms">
            <span className="ml-1 text-blue-500">이용약관</span>
            과&nbsp;
            <span className="ml-1 text-blue-500">개인정보취급방침</span>
            에&nbsp;동의합니다.
          </label>
        </div>
        <button type="submit" className="bg-main text-white h-[45px] mt-10">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
