import React, { useState } from "react";
import { authService } from "@/firebase";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
} from "firebase/auth";
import { EMAILREGEX, PWREGEX } from "@/util";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [nickname, setNickname] = useState("");

    // 회원가입
    const signUp = (e: React.FormEvent) => {
        e.preventDefault();
        createUserWithEmailAndPassword(authService, email, pw)
            .then((data) => {
                updateProfile(data.user, {
                    displayName: nickname,
                });
                return data.user;
            })
            .then((data) => {
                const userData = {
                    uid: data.uid,
                    displayName: nickname,
                    email: data.email,
                };
                console.log(userData);
            })
            .catch((error) => {
                console.log(error);
                // if (error.message.includes("already-in-use")) {
                //     alert("이미 가입한 회원입니다.");
                //     return;
                // }
            });
    };
    // 유효성검사
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setEmail(e.target.value);
        // const inspec = e.target.value;
        // if (inspec?.match(EMAILREGEX)) {
        //     setEmail(inspec);
        // } else {
        //     alert("이메일형식오류");
        // }
    };
    const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPw(e.target.value);
        // const inspec = e.target.value;
        // if (inspec?.match(PWREGEX)) {
        //     setEmail(inspec);
        // } else {
        //     alert("비밀번호형식오류");
        // }
    };
    const handleNickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNickname(e.target.value);
        // const inspec = e.target.value;
        // inspec ? setEmail(inspec) : alert("닉네임입력필수");
    };

    return (
        <div className="w-full h-screen">
            <form
                onClick={signUp}
                className="bg-slate-300 w-2/5 h-4/5 p-10 rounded-md shadow-md mx-auto flex flex-col"
            >
                <h2>회원가입</h2>
                <input
                    id="email"
                    type="email"
                    placeholder="Example@example.com"
                    onChange={handleEmailChange}
                ></input>
                <label htmlFor="email">이메일을 입력해주세요</label>
                <input
                    id="pw"
                    type="password"
                    placeholder="비밀번호 설정"
                ></input>
                <input
                    id="pwConfirm"
                    type="password"
                    placeholder="비밀번호 확인"
                    onChange={handlePwChange}
                ></input>
                <label htmlFor="pwConfirm">
                    비밀번호는 8~20자 이내로 영문, 숫자를 혼용하여 입력해주세요
                </label>
                <input
                    id="nickname"
                    type="text"
                    placeholder="닉네임"
                    maxLength={10}
                    onChange={handleNickChange}
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
