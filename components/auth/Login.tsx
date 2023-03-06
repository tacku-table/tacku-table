import React, { useRef, useState } from "react";
import { authService, dbService } from "@/config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { emailRegex, pwRegex } from "@/util";
import { toast } from "react-toastify";
import socialLoginType from "@/config/global";
import { AiFillGoogleSquare, AiFillFacebook } from "react-icons/ai";

interface LoginProps {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const Login = ({ setStatus, status }: LoginProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const toastAlert = (alertText: string) => {
    toast(`${alertText}`, {
      position: "top-right",
      autoClose: 1300,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  //구글 로그인
  const gooleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authService, provider)
      .then(async (data) => {
        console.log("data", data);
        await setDoc(doc(dbService, "user", data.user.uid), {
          userId: data.user.uid,
          userNickname: data.user.displayName,
          userEmail: data.user.email,
          userPw: "social",
          userImg: "null",
        });
        await updateProfile(data.user, {
          displayName: data.user.displayName,
          photoURL: "null",
        });
        sessionStorage.setItem("User", JSON.stringify(authService.currentUser));
        //location.href = "/mainPage";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //페이스북 로그인
  const fackbookLogin = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(authService, provider)
      .then(async (data) => {
        await setDoc(doc(dbService, "user", data.user.uid), {
          userId: data.user.uid,
          userNickname: data.user.displayName,
          userEmail: data.user.email,
          userPw: "social",
          userImg: "null",
        });
        await updateProfile(data.user, {
          displayName: data.user.displayName,
          photoURL: "null",
        });
        sessionStorage.setItem("User", JSON.stringify(authService.currentUser));
        location.href = "/mainPage";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 유효성 검사
  const validateInputs = () => {
    if (!email) {
      toast.error("email을 입력해주세요.");
      emailRef.current!.focus();
      return true;
    }
    if (!pw) {
      toast.error("password를 입력해주세요.");
      pwRef.current!.focus();
      return true;
    }
    const matchedEmail = email.match(emailRegex);
    const matchedPw = pw.match(pwRegex);

    if (matchedEmail === null) {
      toast.error("이메일 형식에 맞게 입력해 주세요.");
      emailRef.current!.focus();
      return true;
    }
    if (matchedPw === null) {
      toast.error(
        "비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다."
      );
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
        toastAlert("🎉 로그인 성공 ");
        setEmail("");
        setPw("");
        sessionStorage.setItem("User", JSON.stringify(authService.currentUser));
        setTimeout(() => {
          location.href = "/mainPage";
        }, 2000);
      })
      .catch((err) => {
        console.log("err.message:", err.message);
        if (err.message.includes("user-not-found")) {
          toast.warn("회원이 아닙니다. 회원가입을 먼저 진행해 주세요.");
        }
        if (err.message.includes("wrong-password")) {
          setErrorMessage(true);
        }
      });
  };
  return (
    <div className="w-[440px] m-auto">
      <h3 className="text-4xl font-bold text-center">로그인</h3>
      <div className="mt-[40px]">
        <div className="text-center">
          <h6 className="font-semibold text-base float-left ml-4">이메일</h6>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input w-[420px] h-[40px] mt-[10px]"
          />
          <h6 className="font-semibold mt-[20px] text-base float-left ml-4">
            비밀번호
          </h6>
          <input
            id="pw"
            type="password"
            placeholder="비밀번호 설정"
            ref={pwRef}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="register-input w-[420px] h-[40px] mt-[10px]"
          />
        </div>

        <div className="w-full text-center mt-10">
          <button
            type="button"
            onClick={handleLogin}
            className="bg-brand100 text-white h-[40px]  w-[420px]"
          >
            로그인
          </button>
        </div>

        <div>
          <button
            className="float-right mr-[10px] mt-[5px]"
            type="button"
            onClick={() => {
              setStatus("searchPW");
            }}
          >
            비밀번호 찾기
          </button>
        </div>
      </div>
      {errorMessage ? (
        <div className="text-brand100 mt-[32px] text-center">
          이메일 또는 비밀번호를 잘못 입력하셨습니다.
        </div>
      ) : (
        <div className="mt-[32px] h-[24px]"></div>
      )}
      {status === "login" ? (
        <>
          <div className="mt-10 m-auto text-center">
            <span className="text-[16px]">
              아직 <b className="text-blue100">타쿠의 식탁</b> 계정이
              없으신가요?
            </span>
            <button
              className="ml-2 text-[18px] text-blue100 relative font-light"
              type="button"
              onClick={() => {
                setStatus("signUp");
              }}
            >
              지금 가입하기
            </button>
          </div>
          <div className="my-5 flex justify-around">
            <button onClick={gooleLogin}>
              <AiFillGoogleSquare
                style={{ fontSize: "55px", color: "#F16C34" }}
              />
            </button>
            <button onClick={fackbookLogin}>
              <AiFillFacebook style={{ fontSize: "55px", color: "#F16C34" }} />
            </button>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Login;
