import { useRef, FormEvent, useState } from "react";
import { authService } from "@/config/firebase";
import { useSearchParams } from "next/navigation";
import { connectAuthEmulator, confirmPasswordReset } from "firebase/auth";

const ResetPassword = () => {
  //searchParams : URL 검색 매개변수를 읽다. url에 있는 oobcode를 읽는 것같다.
  const searchParams = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [conirmPassword, setConirmPassword] = useState("");

  const newPwRef = useRef<HTMLInputElement>(null);
  const newPwConfirmRef = useRef<HTMLInputElement>(null);
  //oobCode: 요청을 식별하고 확인하는 데 사용되는 일회성 코드
  let oobCode: any = searchParams.get("oobCode");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== conirmPassword) {
      alert("비밀번호가 다릅니다.");
      return;
    }
    confirmPasswordReset(authService, oobCode, newPassword)
      .then((data) => {
        alert("성공");
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id="pw"
            type="password"
            placeholder="비밀번호 설정"
            ref={newPwRef}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            id="pwConfirm"
            type="password"
            placeholder="비밀번호 확인"
            ref={newPwConfirmRef}
            value={conirmPassword}
            onChange={(e) => setConirmPassword(e.target.value)}
          ></input>
        </div>
        <button type="submit">비밀번호 변경</button>
      </form>
    </div>
  );
};

export default ResetPassword;

// import { ChangeEvent, FormEvent, useState } from "react";
// import { authService } from "@/config/firebase";
// //import { usePathname, useRouter, useSearchParams } from 'next/navigation'
// import { useSearchParams } from "next/navigation";
// import { connectAuthEmulator, confirmPasswordReset } from "firebase/auth";

// const confirmThePasswordReset = async (
//   oobCode: string,
//   newPassword: string
// ) => {
//   if (!oobCode && !newPassword) return;

//   return await confirmPasswordReset(authService, oobCode, newPassword);
// };

// const defaultFormFields = {
//   password: "",
//   confirmPassword: "",
// };

// const ResetPassword = () => {
//   const searchParams = useSearchParams();
//   const [formFields, setFormFields] = useState(defaultFormFields);
//   const { password, confirmPassword } = formFields;

//   let oobCode: any = searchParams.get("oobCode");

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert("비밀번호가 다릅니다.");
//       return;
//     }
//     confirmThePasswordReset(oobCode, confirmPassword)
//       .then((oobCode) => {
//         alert("성공");
//       })
//       .catch((error) => {
//         if (error.code === "auth/invalid-action-code") {
//           alert("회원이 아님.");
//           return;
//         }
//         console.log(error.message);
//       });
//     // try {
//     //   if (oobCode) {
//     //     await confirmThePasswordReset(oobCode, confirmPassword);
//     //     resetFormFields();
//     //     setSuccessMessage(true);
//     //   } else {
//     //     alert("Something is wrong; try again later!");
//     //     console.log("missing oobCode");
//     //   }
//     // } catch (error: any) {
//     //   if (error.code === "auth/invalid-action-code") {
//     //     alert("Something is wrong; try again later.");
//     //   }
//     //   console.log(error.message);
//     // }
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormFields({ ...formFields, [name]: value });
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input
//             type="string"
//             value={password}
//             onChange={handleChange}
//             placeholder="New Password"
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="string"
//             value={confirmPassword}
//             onChange={handleChange}
//             placeholder="Confirm Password"
//             required
//           />
//         </div>
//         <button type="submit">비밀번호 변경</button>
//       </form>
//     </div>
//   );
// };

//export default ResetPassword;
