import { authService, dbService } from "../../../config/firebase";
import {
    updatePassword,
    updateProfile,
    reauthenticateWithCredential,
    EmailAuthProvider,
    deleteUser,
    signOut,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, listAll, uploadBytes } from "firebase/storage";
import Image from "next/image";
import defaultImg from "../../../public/images/test1.png";
import { useCallback, useEffect, useState } from "react";
import { storage } from "../../../config/firebase";
import { pwRegex, nickRegex, cls } from "../../../util";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function ProfileEdit(props) {
    const [userInfo, setUserInfo] = useState();
    const [storageCurrentUser, setStorageCurrentUser] = useState({});

    // 프로필이미지 변경
    // const [photoImgURL, setPhotoImgURL] = useState();
    const [imageUpload, setImageUpload] = useState(null);
    const [showUserUpdateImg, setShowUserUpdateImg] = useState();
    const [imgPreview, setImgPreview] = useState("default");
    // 오류메세지
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
    const [nicknameMessage, setNicknameMessage] = useState("");
    // 비밀번호 변경
    const [togglePwChange, setTogglePwChange] = useState(false);
    // 초기값을 기존 비밀번호로 설정
    const [changeUserPw, setChangeUserPw] = useState();
    // 비밀번호 확인
    const [confirmChangeUserPw, setConfirmChangeUserPw] = useState("");
    // 비밀번호 일치
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
    const [isNickname, setIsNickname] = useState(false);

    // 닉네임 변경
    const [changeUserNickname, setChangeUserNickname] = useState([]);
    // 이용약관 체크
    const [agree, setAgree] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setUserInfo(props.userData);
        if (userInfo) {
            getUserProfileImg(userInfo?.userImg);
        }
    }, [userInfo]);

    useEffect(() => {}, []);

    useEffect(() => {
        const currentUser = JSON.parse(sessionStorage.getItem("User"));
        if (currentUser) {
            setStorageCurrentUser(currentUser);
        } else {
            setStorageCurrentUser("logout");
        }
    }, []);
    useEffect(() => {
        if (storageCurrentUser == "logout") {
            location.href = "/login";
        }
    }, [storageCurrentUser]);

    const toastAlert = (alertText) => {
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
    const deleteCurrentUser = () => {
        const currentUser = authService.currentUser;

        if (currentUser) {
            const result = confirm("정말 회원탈퇴를 하실건가요?🥹");

            if (result) {
                signOut(authService).then(() => {
                    sessionStorage.clear();
                    deleteUser(currentUser)
                        .then(() => {
                            toastAlert("회원탈퇴가 완료되었습니다.");
                            location.href = "/main";
                        })
                        .catch((error) => {
                            toast.error(
                                "회원탈퇴에 실패하였습니다. 다시 시도해주세요.\n",
                                error
                            );
                        });
                });
            } else {
                return false;
            }
        }
    };

    const getUserProfileImg = async (userImg) => {
        if (userImg === "null") {
            return setShowUserUpdateImg(defaultImg);
        }
        const imageListRef = ref(storage, "profileImage/");
        await listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    if (url === userImg) {
                        setShowUserUpdateImg(url);
                    }
                });
            });
        });
    };

    const handleImageFile = (event) => {
        const file = event.target.files?.[0];
        setImageUpload(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const selectedImgUrl = reader.result;
            setShowUserUpdateImg(selectedImgUrl);
        };
    };

    const handleChangePassword = useCallback(
        (event) => {
            const changedPw = event.target.value;
            setChangeUserPw(changedPw);
            if (!pwRegex.test(changedPw)) {
                setPasswordMessage(
                    "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
                );
                setIsPassword(false);
            } else {
                setPasswordMessage("안전한 비밀번호로 입력하셨습니다.");
                setIsPassword(true);
            }
        },
        [changeUserPw]
    );
    const handleChangePasswordConfirm = useCallback(
        (event) => {
            const confirmedPW = event.target.value;
            setConfirmChangeUserPw(confirmedPW);

            if (changeUserPw === confirmedPW) {
                setPasswordConfirmMessage("비밀번호가 일치합니다.");
                setIsPasswordConfirm(true);
            } else {
                setPasswordConfirmMessage(
                    "비밀번호가 다릅니다. 다시 입력해주세요."
                );
                setIsPasswordConfirm(false);
            }
        },
        [changeUserPw]
    );
    const handleChangeNickname = (event, setFunction) => {
        setFunction(event.target.value);
        if (!nickRegex.test(event.target.value)) {
            setNicknameMessage(
                "2자 이상 8자 이하로 입력해주세요.(영어 또는 숫자 또는 한글만 가능)"
            );
            setIsNickname(false);
        } else {
            setNicknameMessage("올바른 닉네임 형식입니다.");
            setIsNickname(true);
        }
    };

    const handleUpdateUserDocs = async (uid) => {
        // 비밀번호 변경했을때랑 아닐때
        const docId = uid;
        const docRef = doc(dbService, "user", docId);
        const userProvidedPassword = userInfo?.userPw;
        const credential = EmailAuthProvider.credential(
            authService?.currentUser.email,
            userProvidedPassword
        );
        if (!togglePwChange) {
            setChangeUserPw(userInfo.pw);
            await updateDoc(docRef, {
                userNickname: changeUserNickname,
            });
        } else {
            await updateDoc(docRef, {
                userNickname: changeUserNickname,
                userPw: changeUserPw,
            });
        }
        setTimeout(() => {
            reauthenticateWithCredential(authService?.currentUser, credential)
                .then(async () => {
                    await updatePassword(
                        authService?.currentUser,
                        changeUserPw
                    ).catch((error) =>
                        toast.error("비밀번호 변경에 실패하였습니다.\n", error)
                    );
                    await updateProfile(authService?.currentUser, {
                        displayName: changeUserNickname,
                    })
                        .then(() => {
                            location.href = `/profile/${userInfo?.userId}`;
                        })
                        .catch((error) =>
                            toast.error(
                                "닉네임 변경에 실패하였습니다.\n",
                                error
                            )
                        );
                })
                .catch((error) => toast.error("재로그인이 필요합니다.", error));
        }, 500);
    };

    // 이미지 변경
    const handleUpdateProfile = async (id) => {
        if (imageUpload === null) return;
        const imageRef = ref(storage, `profileImage/${id}`);
        // setImgPreview("uploading");

        await uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
                await updateProfile(authService?.currentUser, {
                    photoURL: url,
                });
                const docRef = doc(dbService, "user", id);
                updateDoc(docRef, {
                    userImg: url,
                }).then(() => {
                    setImgPreview("uploading");
                });
                // setImgPreview(url);
                setShowUserUpdateImg(url);
            });
        });
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center my-[86px]">
                <span className="text-4xl font-bold">회원정보 수정</span>
                <div className="flex flex-col min-w-[532px] py-10 space-y-7">
                    <div className="flex gap-14 items-start">
                        <span className="text-base  min-w-[120px]">
                            프로필 이미지
                        </span>
                        <div className="flex items-end space-x-5">
                            <label className="cursor-pointer hover:opacity-40">
                                {showUserUpdateImg && (
                                    <>
                                        <Image
                                            src={showUserUpdateImg}
                                            className="rounded-md aspect-square"
                                            loader={({ src }) => src}
                                            priority={true}
                                            width={100}
                                            height={100}
                                            alt="프리뷰|업데이트이미지"
                                        />
                                        <div className="relative">
                                            <svg
                                                className="absolute bottom-2 right-2 w-6 h-6 text-black"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                                                ></path>
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                                                ></path>
                                            </svg>
                                        </div>
                                    </>
                                )}

                                <input
                                    id="picture"
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageFile}
                                />
                            </label>
                            <div className="flex flex-col items-start">
                                <button
                                    onClick={() =>
                                        handleUpdateProfile(userInfo.userId)
                                    }
                                    type="button"
                                    disabled={!imageUpload}
                                    className="text-white disabled:opacity-50 bg-brand100 hover:bg-brand100 focus:ring-4 focus:outline-none focus:ring-brand100/50 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-brand100/80 dark:focus:ring-brand100/40 "
                                >
                                    수정
                                </button>
                                {imgPreview === "uploading" && (
                                    <span className="text-sm text-blue100">
                                        프로필이미지 변경 완료
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-14 items-center">
                        <span className="text-base min-w-[120px]">이메일</span>
                        <input
                            disabled
                            placeholder={`${userInfo?.userEmail}`}
                            className="min-w-[300px] pl-3 border-mono60 border-[1px] h-10"
                        />
                    </div>
                    <div>
                        <div className="flex gap-14 items-center">
                            <span className="text-base min-w-[120px] ">
                                비밀번호 변경
                            </span>
                            {!togglePwChange && (
                                <div className="px-2 py-1 text-center w-fit border-mono60 border-[1px] text-base">
                                    <button
                                        onClick={() => setTogglePwChange(true)}
                                    >
                                        변경하기
                                    </button>
                                </div>
                            )}
                            {togglePwChange && (
                                <div>
                                    <input
                                        type="password"
                                        placeholder="변경할 비밀번호를 입력해주세요."
                                        onChange={handleChangePassword}
                                        className="min-w-[300px] pl-3 border-mono60 border-[1px] h-10 focus:outline-none focus:border-0 focus:ring-2 ring-brand100"
                                    />
                                    <div className="h-[16px]">
                                        {changeUserPw?.length > 0 && (
                                            <span
                                                className={cls(
                                                    "text-xs",
                                                    `${
                                                        isPassword
                                                            ? "text-xs text-blue100"
                                                            : "text-brand100"
                                                    }`
                                                )}
                                            >
                                                {passwordMessage}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {togglePwChange && (
                        <div className="flex flex-col">
                            <label className="flex gap-14 items-center">
                                <span className="text-base min-w-[120px]">
                                    비밀번호 변경 확인
                                </span>
                                <div>
                                    <input
                                        type="password"
                                        placeholder="확인을 위해 비밀번호를 재입력해주세요."
                                        onChange={handleChangePasswordConfirm}
                                        className="min-w-[300px] pl-3 border-mono60 border-[1px] h-10  focus:outline-none focus:border-0 focus:ring-2 ring-brand100"
                                    />
                                    <div className="h-[16px]">
                                        {confirmChangeUserPw?.length > 0 && (
                                            <span
                                                className={cls(
                                                    "text-xs",
                                                    `${
                                                        isPasswordConfirm
                                                            ? "text-blue-600"
                                                            : "text-orange-500"
                                                    }`
                                                )}
                                            >
                                                {passwordConfirmMessage}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </label>
                        </div>
                    )}
                    <div className="flex flex-col">
                        <label className="flex gap-14 items-center">
                            <span className="text-base min-w-[120px]">
                                닉네임 변경
                            </span>
                            <div>
                                <input
                                    type="text"
                                    onChange={(event) =>
                                        handleChangeNickname(
                                            event,
                                            setChangeUserNickname
                                        )
                                    }
                                    className="min-w-[300px] pl-3 border-mono60 border-[1px] h-10  focus:outline-none focus:border-0 focus:ring-2 ring-brand100"
                                />
                                <div className="h-[16px]">
                                    {changeUserNickname.length > 0 && (
                                        <span
                                            className={cls(
                                                "text-xs",
                                                `${
                                                    isPasswordConfirm
                                                        ? "text-blue-600"
                                                        : "text-orange-500"
                                                }`
                                            )}
                                        >
                                            {nicknameMessage}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </label>
                    </div>
                    <hr className="border-[1px] w-[580px] border-mono70 mb-4" />
                    <div className="flex justify-between items-center">
                        <label htmlFor="terms">
                            <input
                                id="terms"
                                type="checkbox"
                                onClick={(event) => {
                                    const target = event.target;
                                    setAgree(target.checked);
                                }}
                            />
                            <span className="ml-1 text-blue-500">이용약관</span>
                            과&nbsp;
                            <span className="ml-1 text-blue-500">
                                개인정보취급방침
                            </span>
                            에&nbsp;동의합니다.
                        </label>
                        <button
                            onClick={deleteCurrentUser}
                            className="disabled:text-mono100 bg-mono30 valid:hover:bg-brand100 hover:text-white focus:ring-4 focus:outline-none focus:ring-brand100/50 font-normal rounded-r-sm text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-brand100/80 dark:focus:ring-brand100/40 mb-2"
                            disabled={!agree}
                        >
                            회원탈퇴
                        </button>
                    </div>
                </div>
                <div className="space-x-5">
                    <button
                        className="disabled:bg-mono30 disabled:text-mono100 valid:bg-brand100 valid:text-white hover:bg-brand100/80 focus:ring-4 focus:outline-none focus:ring-brand100/50 font-medium rounded-sm text-sm px-28 py-2.5 text-center inline-flex items-center dark:hover:bg-brand100/80 dark:focus:ring-brand100/40 mb-2"
                        onClick={() => handleUpdateUserDocs(userInfo.userId)}
                        disabled={
                            !((isPassword && isPasswordConfirm) || isNickname)
                        }
                    >
                        수정하기
                    </button>
                    <button
                        onClick={() => router.back()}
                        className="text-mono100 bg-mono30 hover:bg-brand100 hover:text-white focus:ring-4 focus:outline-none focus:ring-brand100/50 font-medium rounded-sm text-sm px-28 py-2.5 text-center inline-flex items-center dark:hover:bg-brand100/80 dark:focus:ring-brand100/40 mb-2"
                    >
                        취소하기
                    </button>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const { query } = context;
    const { id, userImg } = query;
    const docId = id;
    let userData;
    const snapshot = await getDoc(doc(dbService, "user", docId));
    if (snapshot.exists()) {
        userData = snapshot.data();
    } else {
        toastAlert("회원 정보가 없습니다.");
    }

    return {
        props: {
            id,
            userData,
            userImg,
        },
    };
};
