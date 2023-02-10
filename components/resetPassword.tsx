// import { ChangeEvent, FormEvent, useState } from "react";
// import { authService } from "@/shared/firebase";
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

// export default ResetPassword;
import React from "react";

function resetPassword() {
  return <div>resetPassword</div>;
}

export default resetPassword;
