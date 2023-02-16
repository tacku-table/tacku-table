import React, { useRef, useState } from "react";
import { authService } from "@/config/firebase";
import {
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { emailRegex, pwRegex } from "@/util";

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
            .then((data) => {
                updateProfile(data.user, {
                    displayName: nickname,
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
        <div className="w-full h-screen">
            <form
                onSubmit={signUp}
                className="bg-slate-300 w-2/5 h-4/5 p-10 rounded-md shadow-md mx-auto flex flex-col"
            >
                <h2>회원가입</h2>
                <input
                    id="email"
                    type="email"
                    placeholder="Example@example.com"
                    ref={emailRef}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <label htmlFor="email">이메일을 입력하세요</label>
                <input
                    id="pw"
                    type="password"
                    placeholder="비밀번호 설정"
                    ref={pwRef}
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                ></input>
                <label htmlFor="pw">
                    비밀번호는 8~20자 이내로 영문, 숫자를 혼용하여 입력하세요
                </label>
                <input
                    id="pwConfirm"
                    type="password"
                    placeholder="비밀번호 확인"
                    ref={pwConfirmRef}
                    value={pwConfirm}
                    onChange={(e) => setPwConfirm(e.target.value)}
                ></input>
                <label htmlFor="pwConfirm">
                    비밀번호 입력란과 동일하게 입력하세요
                </label>
                <input
                    id="nickname"
                    type="text"
                    placeholder="닉네임"
                    maxLength={10}
                    ref={nicknameRef}
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                ></input>
                <label htmlFor="nickname">10자 이내</label>
                <button type="submit" className="bg-black text-white">
                    회원가입
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
