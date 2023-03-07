import React, { useEffect, useState } from "react";
import { authService, dbService } from "@/config/firebase";
import {
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { cls, emailRegex, pwRegex, nickRegex } from "@/util";
import {
    setDoc,
    doc,
    query,
    collection,
    where,
    getDocs,
} from "firebase/firestore";
import { useForm } from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types";
import ShowPwBtn from "../button/signup/ShowPwBtn";
import HidePwBtn from "../button/signup/HidePwBtn";
import ShowPwConfirmBtn from "../button/signup/ShowPwConfirmBtn";
import HidePwConfirmBtn from "../button/signup/HidePwConfirmBtn";
import { Success, Warn, Error } from "../toastify/Alert";

interface RegisterForm {
    email: string;
    pw: string;
    pwConfirm: string;
    nickname: string;
    checkbox: boolean;
    errors?: string;
}

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<RegisterForm>({ mode: "onChange" });
    const onValid = (data: RegisterForm) => {
        signUp();
    };
    const onInValid = (errors: FieldErrors) => {
        console.log(errors);
    };
    const [showPw, setShowPw] = useState(false);
    const [showPwConfirm, setShowPwConfirm] = useState(false);
    const [nicknameCheck, setNicknameCheck] = useState(false);
    const [notNicknameDuplicateCheck, setNotNicknameDuplicateCheck] =
        useState(true);
    const [saveNickname, setSaveNickname] = useState("");
    const [isUsing, setIsUsing] = useState([]);

    // 회원가입
    const signUp = () => {
        createUserWithEmailAndPassword(
            authService,
            getValues("email"),
            getValues("pw")
        ).then(async (data) => {
            Promise.all([
                setDoc(doc(dbService, "user", data.user.uid), {
                    userId: data.user.uid,
                    userNickname: getValues("nickname"),
                    userEmail: getValues("email"),
                    userPw: getValues("pw"),
                    userImg: "null",
                }),
                updateProfile(data.user, {
                    displayName: getValues("nickname"),
                    photoURL: "null",
                }),
                Success("회원가입성공! 로그인해주세요"),
            ]).catch((error) => {
                console.log(error.message);
                if (error.message.includes("already-in-use")) {
                    Warn("이미 가입한 회원입니다");
                    return;
                }
            });
            setTimeout(() => {
                signOut(authService).then(() => {
                    sessionStorage.clear();
                    location.href = "/login";
                });
            }, 1000);

            return data.user;
        });
    };

    // 이메일 중복확인
    // const emailConfirm = async () => {
    //     const items = query(
    //         collection(dbService, "user"),
    //         where("userEmail", "==", getValues("email"))
    //     );
    //     const querySnapshot = await getDocs(items);
    //     // const newData = querySnapshot.docs;
    //     const newData = querySnapshot.docs.map((doc) => ({
    //         ...doc.data(),
    //     }));
    //     // @ts-ignore
    //     setIsUsing(newData);
    //     console.log(isUsing);
    // };

    // 닉네임 중복체크
    const nicknameDuplicate = async () => {
        const { nickname } = getValues();
        const nickNameCheck = query(
            collection(dbService, "user"),
            where("userNickname", "==", nickname)
        );
        const querySnapshot = await getDocs(nickNameCheck);
        const newData = querySnapshot.docs;

        if (newData.length == 0 && nickname.length > 0) {
            Success("사용 가능한 닉네임입니다.");
            setSaveNickname(nickname);
            setNicknameCheck(true);
            return setNotNicknameDuplicateCheck(false);
        } else {
            if (nickname.length != 0) {
                Warn("이미 다른 유저가 사용 중입니다.");
            } else {
                Error("알 수 없는 에러로 사용할 수 없습니다.");
            }
            setNicknameCheck(false);
            return setNotNicknameDuplicateCheck(true);
        }
    };

    // 브라우저 뒤로가기 버튼시 confirm창과 함께 "확인"클릭시 로그인 페이지로 이동하는 함수입니다.
    useEffect(() => {
        window.history.pushState(null, "null", document.URL);
        window.addEventListener("popstate", function () {
            const result = window.confirm("회원가입을 취소하시겠습니까?");
            if (result) {
                window.location.replace(`/login`);
            }
        });
        // emailConfirm();
    }, []);

    return (
        <div className="w-[420px] mx-auto mb-20 text-mono100">
            <form
                onSubmit={handleSubmit(onValid, onInValid)}
                className="flex flex-col relative"
            >
                <h2 className="text-3xl font-bold self-center">회원가입</h2>
                <label htmlFor="email" className="font-semibold mt-4">
                    이메일
                </label>
                <input
                    {...register("email", {
                        required: "이메일을 입력하세요",
                        pattern: {
                            value: emailRegex,
                            message: "이메일형식에 맞게 입력해주세요",
                        },
                    })}
                    id="email"
                    type="email"
                    placeholder="Example@example.com"
                    className="register-input"
                ></input>
                <p
                    className={cls(
                        errors.email
                            ? "mt-[5px] text-red100 text-xs"
                            : "mt-[5px] h-[16px]"
                    )}
                >
                    {errors.email?.message}
                </p>
                <label htmlFor="pw" className="font-semibold mt-4">
                    비밀번호
                </label>
                <div className="relative">
                    <input
                        {...register("pw", {
                            required: "비밀번호를 입력하세요",
                            minLength: {
                                message:
                                    "영문, 숫자, 특수기호 포함 최소 8자이상 입력해주세요",
                                value: 8,
                            },
                            pattern: {
                                value: pwRegex,
                                message:
                                    "영문, 숫자, 특수기호를 포함해야 합니다",
                            },
                        })}
                        id="pw"
                        type={showPw ? "text" : "password"}
                        placeholder="비밀번호 설정"
                        className="register-input w-full"
                    ></input>
                    <div className="absolute top-[18px] right-7">
                        <ShowPwBtn showPw={showPw} setShowPw={setShowPw} />
                        <HidePwBtn showPw={showPw} setShowPw={setShowPw} />
                    </div>
                </div>
                <p
                    className={cls(
                        errors.pw
                            ? "mt-[5px] text-red100 text-xs"
                            : "mt-[5px] h-[16px]"
                    )}
                >
                    {errors.pw?.message}
                </p>
                <label htmlFor="pwConfirm" className="font-semibold mt-4">
                    비밀번호 확인
                </label>
                <div className="relative">
                    <input
                        {...register("pwConfirm", {
                            required: "비밀번호 확인란을 입력하세요",
                            validate: {
                                notSamePw: (value) =>
                                    value === getValues("pw") ||
                                    "비밀번호 입력란과 동일하게 입력하세요",
                            },
                        })}
                        id="pwConfirm"
                        type={showPwConfirm ? "text" : "password"}
                        placeholder="비밀번호 확인"
                        className="register-input w-full"
                    ></input>
                    <div className="absolute top-[18px] right-7">
                        <ShowPwConfirmBtn
                            showPwConfirm={showPwConfirm}
                            setShowPwConfirm={setShowPwConfirm}
                        />
                        <HidePwConfirmBtn
                            showPwConfirm={showPwConfirm}
                            setShowPwConfirm={setShowPwConfirm}
                        />
                    </div>
                </div>
                <p
                    className={cls(
                        errors.pwConfirm
                            ? "mt-[5px] text-red100 text-xs"
                            : "mt-[5px] h-[16px]"
                    )}
                >
                    {errors.pwConfirm?.message}
                </p>
                <label htmlFor="nickname" className="font-semibold mt-4">
                    닉네임
                </label>
                <div className="relative">
                    <div className="flex items-center">
                        <input
                            {...register("nickname", {
                                required: "닉네임을 입력하세요",
                                maxLength: {
                                    message: "최대 8자까지 입력가능합니다",
                                    value: 8,
                                },
                                onChange: () => {
                                    setNotNicknameDuplicateCheck(true);
                                },
                                pattern: {
                                    value: nickRegex,
                                    message:
                                        "8자 이하의 영어, 숫자, 한글로만 입력해주세요.",
                                },
                                validate: {
                                    value: () =>
                                        nicknameCheck ||
                                        "닉네임 중복 체크 후 고유한 닉네임으로 설정해주세요",
                                },
                            })}
                            id="nickname"
                            type="text"
                            placeholder="닉네임 입력"
                            className="register-input"
                        ></input>
                        <div
                            className="mt-2 ml-10 cursor-pointer text-brand100 hover:text-white border border-brand100 hover:bg-brand100 font-medium text-sm px-2 py-2 text-center"
                            onClick={nicknameDuplicate}
                        >
                            중복 체크
                        </div>
                    </div>
                    <p
                        className={cls(
                            errors.nickname
                                ? "mt-[5px] text-red100 text-xs"
                                : "mt-[5px] h-[16px]"
                        )}
                    >
                        {errors.nickname?.message}
                    </p>
                </div>
                <div className="border border-mono50 mt-7"></div>
                <div className="flex text-mono80 text-xs mt-2">
                    <input
                        {...register("checkbox", {
                            required: "동의하셔야 가입가능합니다",
                        })}
                        type="checkbox"
                    />
                    <label htmlFor="terms">
                        <span className="ml-1 text-blue100">이용약관</span>
                        과&nbsp;
                        <span className="ml-1 text-blue100">
                            개인정보취급방침
                        </span>
                        에&nbsp;동의합니다.
                    </label>
                </div>
                <p className="mt-[5px] text-red100 text-xs">
                    {errors.checkbox?.message}
                </p>
                <button
                    type="submit"
                    className="bg-brand100 text-white h-[45px] mt-10"
                >
                    회원가입
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
