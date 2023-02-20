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
        alert("성공");
        window.location.href = "/loginPage";
      })
      .catch((error) => {
        if (error.code === "auth/invalid-action-code") {
          alert("회원이 아님.");
          return;
        }
        console.log(error.message);
      });
  };

  return (
    <div className="bg-slate-300 w-2/5 h-4/5 p-10 rounded-md shadow-md mx-auto flex flex-col bd-3">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id="pw"
            type="password"
            placeholder="비밀번호 설정"
            ref={newPwRef}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-150 p-2.5"
          ></input>
        </div>
        <label htmlFor="pw">
          비밀번호는 8~20자 이내로 영문, 숫자를 혼용하여 입력하세요
        </label>
        <div>
          <input
            id="pwConfirm"
            type="password"
            placeholder="비밀번호 확인"
            ref={newPwConfirmRef}
            value={conirmPassword}
            onChange={(e) => setConirmPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-150 p-2.5"
          ></input>
        </div>
        {passwordError || (
          <div>
            {newPassword === "" || conirmPassword === ""
              ? "비밀번호 또는 비밀번호확인란이 비어있습니다"
              : "비밀번호는 8자리 이상, 영어 대, 소문자, 1개 이상의 숫자와 특수문자(!@#$%^&*) 조합이어야 합니다."}
          </div>
        )}
        <button
          type="submit"
          className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          비밀번호 변경
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
