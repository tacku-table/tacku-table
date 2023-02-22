import { useRef, FormEvent, useState } from "react";
import { authService } from "@/config/firebase";
import { useSearchParams } from "next/navigation";
import { confirmPasswordReset } from "firebase/auth";
import { emailRegex, pwRegex } from "@/util";

const ResetPassword = () => {
  //searchParams : URL 검색 매개변수를 읽다. url에 있는 oobcode를 읽는 것같다.
  const searchParams = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [conirmPassword, setConirmPassword] = useState("");
  const newPwRef = useRef<HTMLInputElement>(null);
  const newPwConfirmRef = useRef<HTMLInputElement>(null);
  const [passwordError, setPasswordError] = useState(true);

  //oobCode: 요청을 식별하고 확인하는 데 사용되는 일회성 코드
  let oobCode: any = searchParams.get("oobCode");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPassword || !conirmPassword) {
      setPasswordError(false);
      newPwRef.current!.focus();
      return true;
    }
    if (!newPassword.match(pwRegex) || !conirmPassword.match(pwRegex)) {
      setPasswordError(false);
      newPwRef.current!.focus();
      return true;
    }
    if (newPassword !== conirmPassword) {
      alert("비밀번호가 다릅니다.");
      return;
    }
    confirmPasswordReset(authService, oobCode, newPassword)
      .then((data) => {
        alert("비밀번호를 변경했습니다. 다시 로그인해주세요.");
        window.location.href = "/loginPage";
      })
      .catch((error) => {
        if (error.code === "auth/invalid-action-code") {
          alert("회원이 아닙니다.");
          return;
        }
        console.log(error.message);
      });
  };

  return (
    <div className="w-[420px] h-full mx-auto text-center py-60">
      <h3 className="text-4xl font-bold text-center mb-10">비밀번호 변경</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-10">
          <h6 className="font-semibold float-left">새로운 비밀번호</h6>
          <input
            id="pw"
            type="password"
            placeholder="비밀번호 설정"
            ref={newPwRef}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="register-input w-full h-10 border-1 border-mono60  text-input"
          />
          <label
            htmlFor="newPassword"
            className="text-xs text-mono80 float-left"
          >
            비밀번호는 8~20자 이내로 영문, 숫자를 혼용하여 입력하세요
          </label>
        </div>
        <div>
          <h6 className="font-semibold text-base float-left">비밀번호 확인</h6>
          <input
            id="pwConfirm"
            type="password"
            placeholder="비밀번호 확인"
            ref={newPwConfirmRef}
            value={conirmPassword}
            onChange={(e) => setConirmPassword(e.target.value)}
            className="register-input w-full h-10 border-1 border-mono60  text-input mb-10"
          />
        </div>
        <button
          type="submit"
          className="bg-brand100 text-white h-[40px] w-full mb-3"
        >
          비밀번호 변경
        </button>
        {passwordError || (
          <div className="text-red100 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <p>
              {newPassword === "" || conirmPassword === ""
                ? "비밀번호 또는 비밀번호확인란이 비어있습니다"
                : "비밀번호는 8자리 이상, 영어 대, 소문자, 1개 이상의 숫자와 특수문자(!@#$%^&*) 조합이어야 합니다."}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
