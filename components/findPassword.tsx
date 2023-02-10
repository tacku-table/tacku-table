import React, { useRef, useState } from "react";
import Link from "next/link";
import { authService } from "@/shared/firebase";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
} from "firebase/auth";

const FindPassword = () => {
  // useRef로 취득하는 DOM은 최초 mount되기 전엔 null이다
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [newpasswordConfirm, setNewpasswordConfirm] = useState("");
  // email, password 정규식
  const emailRegex =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  const passwordRegx = /^[A-Za-z0-9]{8,20}$/;
  // email password 유효성검사
  const changePassword = () => {
    if (!email) {
      alert("이메일을 입력하세요");
      emailRef.current!.focus();
      return true;
    } else if (!email.match(emailRegex)) {
      alert("이메일형식에 맞게 입력해주세요");
      emailRef.current!.focus();
      return true;
    }

    // if (!(password || passwordConfirm)) {
    //   alert("비밀번호 또는 비밀번호확인란이 비어있습니다");
    //   passwordRef.current!.focus();
    //   return true;
    // } else if (!password.match(passwordRegx)) {
    //   alert("비밀번호형식에 맞게 입력해주세요");
    //   passwordRef.current!.focus();
    //   return true;
    // } else if (password !== passwordConfirm) {
    //   alert("비밀번호 확인이 일치하지 않습니다");
    //   passwordConfirmRef.current!.focus();
    //   return true;
    // }
  };

  // 비밀번호 재설정 메일 보내기
  const handleResetPassword = (e: any) => {
    e.preventDefault();
    if (changePassword()) {
      return;
    }
    sendPasswordResetEmail(authService, email)
      .then((data) => {
        console.log("보내기 성공");
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
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewpassword(e.target.value);
  };
  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewpasswordConfirm(e.target.value);
  };
  return (
    <>
      <input
        id="email"
        type="email"
        placeholder="Example@example.com"
        ref={emailRef}
        value={email}
        onChange={onChangeEmail}
      />
      {/* <input
        id="pw"
        type="password"
        placeholder="password"
        ref={passwordRef}
        value={newpassword}
        onChange={onChangePassword}
      ></input>
      <input
        id="pwConfirm"
        type="password"
        placeholder="passwordConfirm"
        ref={passwordConfirmRef}
        value={newpasswordConfirm}
        onChange={onChangePasswordConfirm}
      ></input> */}
      <button type="submit" onClick={handleResetPassword}>
        이메일 인증
      </button>
    </>
  );
};
export default FindPassword;
