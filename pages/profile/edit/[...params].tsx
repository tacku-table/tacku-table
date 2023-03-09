import { authService, dbService } from "../../../config/firebase";
import {
  updatePassword,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
  signOut,
  User,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, listAll, uploadBytes } from "firebase/storage";
import Image, { StaticImageData } from "next/image";
import defaultImg from "../../../public/images/test1.png";
import {
  ChangeEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { storage } from "../../../config/firebase";
import { pwRegex, nickRegex, cls } from "../../../util";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Seo from "../../../components/layout/Seo";

interface ProfileEditProp {
  id: string;
  userData: TUserInfo;
  userImg: string;
}

export default function ProfileEdit(props: ProfileEditProp) {
  const [userInfo, setUserInfo] = useState<TUserInfo>();
  const [storageCurrentUser, setStorageCurrentUser] = useState<User>();

  // 프로필이미지 변경
  // const [photoImgURL, setPhotoImgURL] = useState();
  const [imageUpload, setImageUpload] = useState<
    File | Blob | ArrayBuffer | Uint8Array
  >();
  const [showUserUpdateImg, setShowUserUpdateImg] = useState<
    StaticImageData | string | ArrayBuffer | null
  >();
  const [imgPreview, setImgPreview] = useState("default");
  // 오류메세지
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  // 비밀번호 변경
  const [togglePwChange, setTogglePwChange] = useState(false);
  const [changeUserPw, setChangeUserPw] = useState<string | undefined>("");
  // 비밀번호 확인
  const [confirmChangeUserPw, setConfirmChangeUserPw] = useState("");
  // 비밀번호 일치
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isNickname, setIsNickname] = useState(false);

  // 닉네임 변경
  const [changeUserNickname, setChangeUserNickname] = useState<
    string | undefined
  >();
  // 닉네임 중복확인
  const [notNicknameDuplicateCheck, setNotNicknameDuplicateCheck] =
    useState(true);
  const [saveNickname, setSaveNickname] = useState<any>("");
  const [nicknameCheck, setNicknameCheck] = useState(false);
  // const [error, setError] = useState("");
  // const [nicknameErrorMsg, setNicknameErrorMsg] = useState("");
  // 이용약관 체크
  const [agree, setAgree] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setUserInfo(props.userData);
    if (userInfo) {
      getUserProfileImg(userInfo?.userImg as unknown as string);
    }
  }, [userInfo]);

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("User") || "");
    if (currentUser) {
      setStorageCurrentUser(currentUser);
    } else {
      setStorageCurrentUser("logout" as unknown as undefined);
    }
  }, []);
  useEffect(() => {
    if (storageCurrentUser == ("logout" as unknown as undefined)) {
      location.href = "/loginPage";
    }
  }, [storageCurrentUser]);

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
              location.href = "/mainPage";
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

  const getUserProfileImg = async (userImg: string) => {
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

  const handleImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageUpload(file);
    const reader = new FileReader();
    reader.readAsDataURL(file as unknown as Blob);
    reader.onload = () => {
      const selectedImgUrl = reader.result;
      setShowUserUpdateImg(selectedImgUrl);
    };
  };

  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const changedPw = event.target.value;
      // console.log(changedPw);
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
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const confirmedPW = event.target.value;
      setConfirmChangeUserPw(confirmedPW);

      if (changeUserPw === confirmedPW) {
        setPasswordConfirmMessage("비밀번호가 일치합니다.");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 다릅니다. 다시 입력해주세요.");
        setIsPasswordConfirm(false);
      }
    },
    [changeUserPw]
  );
  const handleChangeNickname = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunction: React.Dispatch<SetStateAction<string | undefined>>
  ) => {
    setFunction(event.target.value);

    const nickname = event.target.value;
    const nickNameCheck = query(
      collection(dbService, "user"),
      where("userNickname", "==", nickname)
    );
    const querySnapshot = await getDocs(nickNameCheck);
    const newData = querySnapshot.docs;

    if (!nickRegex.test(event.target.value)) {
      setNicknameMessage(
        "2자 이상 8자 이하로 입력해주세요.(영어 또는 숫자 또는 한글만 가능)"
      );
      setIsNickname(false);
    } else {
      if (newData.length == 0 && nickname.length > 0) {
        setNicknameMessage("사용 가능한 닉네임입니다.");
        setSaveNickname(nickname);
        return setIsNickname(true);
      } else {
        if (nickname.length != 0) {
          setNicknameMessage("이미 다른 유저가 사용 중입니다.");
          setIsNickname(false);
        } else {
          setNicknameMessage("알 수 없는 에러로 사용할 수 없습니다.");
          setIsNickname(false);
          return;
        }
      }
    }
  };

  // 닉네임 변경 함수
  const handleUpdateNickname = async (uid: string) => {
    const docRef = doc(dbService, "user", uid);
    await updateDoc(docRef, {
      userNickname: changeUserNickname,
    });
    await updateProfile(authService?.currentUser as unknown as User, {
      displayName: changeUserNickname,
    })
      .then(() => {
        toastAlert("닉네임 변경 완료");
      })
      .catch((error) => toast.error("닉네임 변경에 실패하였습니다.\n", error));
  };
  // 비밀번호 변경
  const handleUpdatePassword = async (uid: string) => {
    if (!togglePwChange) return;
    const docRef = doc(dbService, "user", uid);
    const userProvidedPassword = userInfo?.userPw;
    const credential = EmailAuthProvider.credential(
      storageCurrentUser?.email as unknown as string,
      userProvidedPassword as unknown as string
    );
    await updateDoc(docRef, {
      userPw: changeUserPw,
    });
    reauthenticateWithCredential(
      authService?.currentUser as unknown as User,
      credential
    )
      .then(async () => {
        await updatePassword(
          authService?.currentUser as unknown as User,
          changeUserPw as unknown as string
        ).catch((error) =>
          toast.error("비밀번호 변경에 실패하였습니다.\n", error)
        );
      })
      .catch((error) => toast.error("재로그인이 필요합니다.", error));
  };

  // 이미지 변경
  const handleUpdateProfile = async (id: string) => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `profileImage/${id}`);
    // setImgPreview("uploading");

    await uploadBytes(
      imageRef,
      imageUpload as unknown as Blob | ArrayBuffer | Uint8Array
    ).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        await updateProfile(authService?.currentUser as unknown as User, {
          photoURL: url,
        });
        const docRef = doc(dbService, "user", id);
        updateDoc(docRef, {
          userImg: url,
        }).then(() => {
          setImgPreview("uploading");
          toastAlert("프로필 이미지 변경 완료");
        });
        // setImgPreview(url);
        setShowUserUpdateImg(url);
      });
    });
  };

  return (
    <>
      <Seo title="회원정보수정" />

      <div className="flex flex-col justify-center items-center my-20 lg:my-[86px]">
        <div className="flex items-center relative w-full justify-center pb-10">
          <span className="text-4xl text-center font-bold">회원정보 수정</span>
          <button className="absolute right-0" onClick={() => router.back()}>
            <svg
              className="w-8 h-8 rounded-full text-mono100  hover:text-white hover:bg-brand100 focus:ring-4 focus:outline-none focus:ring-brand100/50 font-medium text-sm text-center inline-flex items-center mb-2"
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
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-col justify-center space-y-10">
          <div className="flex gap-14 items-start">
            <span className="text-base  min-w-[120px]">프로필 이미지</span>
            <div className="flex flex-col">
              {showUserUpdateImg && (
                <div>
                  <Image
                    src={
                      showUserUpdateImg as unknown as string | StaticImageData
                    }
                    className="w-[150px] h-[150px] rounded-md aspect-square"
                    loader={({ src }) => src}
                    priority={true}
                    width={150}
                    height={150}
                    alt="프리뷰|업데이트이미지"
                  />
                </div>
              )}
              <div className="mt-3 flex justify-between space-x-2">
                <label className="cursor-pointer">
                  <div className=" text-white disabled:opacity-50 bg-brand100 hover:bg-brand100 focus:ring-4 focus:outline-none focus:ring-brand100/50 font-medium rounded-sm text-sm px-2 py-2 text-center inline-flex justify-center items-center dark:hover:bg-brand100/80 dark:focus:ring-brand100/40 ">
                    <span>이미지 편집</span>
                  </div>
                  <input
                    id="picture"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageFile}
                  />
                </label>

                {imageUpload && (
                  <div
                    onClick={() =>
                      handleUpdateProfile(userInfo?.userId as unknown as string)
                    }
                    className="cursor-pointer text-white disabled:opacity-50 bg-brand100 hover:bg-brand100 focus:ring-4 focus:outline-none focus:ring-brand100/50 font-medium rounded-sm text-sm px-2 py-2 text-center inline-flex justify-center dark:hover:bg-brand100/80 dark:focus:ring-brand100/40 "
                  >
                    <span>저장하기</span>
                  </div>
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
          {userInfo?.userPw !== "social" && (
            <>
              <div>
                <div className="flex gap-14 items-center">
                  {!togglePwChange && (
                    <>
                      <span className="text-base min-w-[120px] ">
                        비밀번호 변경
                      </span>
                      <div className="px-2 py-1 text-center w-fit border-mono60 border-[1px] text-base">
                        <button onClick={() => setTogglePwChange(true)}>
                          변경하기
                        </button>
                      </div>
                    </>
                  )}
                  {togglePwChange && (
                    <div className="">
                      <div className="flex gap-14 items-center">
                        <span className="text-base min-w-[120px] ">
                          비밀번호 변경
                        </span>
                        <input
                          type="password"
                          placeholder="변경할 비밀번호를 입력해주세요."
                          onChange={handleChangePassword}
                          className="min-w-[300px] pl-3 border-mono60 border-[1px] h-10 focus:outline-none focus:border-0 focus:ring-2 ring-brand100"
                        />
                      </div>
                      <div className="grid-cols-2 items-end">
                        <div className="h-[16px] ml-[176px] mt-1">
                          {(changeUserPw?.length as number) > 0 && (
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
                    </div>
                  )}
                </div>
              </div>
              {togglePwChange && (
                <div>
                  <div className="flex gap-14 items-center">
                    <span className="text-base min-w-[120px]">
                      비밀번호 변경 확인
                    </span>
                    <input
                      type="password"
                      placeholder="확인을 위해 비밀번호를 재입력해주세요."
                      onChange={handleChangePasswordConfirm}
                      className="min-w-[300px] pl-3 border-mono60 border-[1px] h-10  focus:outline-none focus:border-0 focus:ring-2 ring-brand100"
                    />
                  </div>
                  <div className="grid-cols-2 items-end">
                    <div className="h-[16px] ml-[176px] mt-1">
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
                    <button
                      className="float-right mt-4 w-fit cursor-pointer  disabled:bg-mono30 disabled:text-mono100 valid:bg-brand100 valid:text-white hover:bg-brand100/80 focus:ring-4 focus:outline-none focus:ring-brand100/50 font-medium rounded-sm text-sm px-2 py-2.5 text-center inline-flex items-center dark:hover:bg-brand100/80 dark:focus:ring-brand100/40 mb-2"
                      disabled={!(isPassword && isPasswordConfirm)}
                      onClick={() =>
                        handleUpdatePassword(
                          userInfo?.userId as unknown as string
                        )
                      }
                    >
                      수정하기
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          <div className={cls(`${togglePwChange && "mt-8"}`)}>
            <div className="flex gap-14 items-center">
              <span className="text-bases w-[120px]">닉네임 변경</span>
              <input
                type="text"
                onChange={(event) =>
                  handleChangeNickname(event, setChangeUserNickname)
                }
                className="w-[300px] pl-3 border-mono60 border-[1px] h-10  focus:outline-none focus:border-0 focus:ring-2 ring-brand100"
              />
            </div>

            <div className="grid-cols-2 items-end">
              <div className="h-[16px] ml-[176px] mt-1">
                {(changeUserNickname?.length as number) > 0 && (
                  <span
                    className={cls(
                      "text-xs",
                      `${isNickname ? "text-blue-600" : "text-orange-500"}`
                    )}
                  >
                    {nicknameMessage}
                  </span>
                )}
              </div>
              <button
                className="w-fit float-right mt-4 cursor-pointer disabled:bg-mono30 disabled:text-mono100 valid:bg-brand100 valid:text-white hover:bg-brand100/80 focus:ring-4 focus:outline-none focus:ring-brand100/50 font-medium rounded-sm text-sm px-2 py-2.5 text-center  dark:hover:bg-brand100/80 dark:focus:ring-brand100/40 mb-2"
                disabled={!isNickname}
                onClick={() => handleUpdateNickname(userInfo?.userId as string)}
              >
                수정하기
              </button>
            </div>
          </div>
          <div>
            <div className="flex gap-14 items-center">
              <span className="text-bases w-[120px]">회원탈퇴</span>
              <div className="max-w-[300px]">
                <label htmlFor="terms">
                  <input
                    id="terms"
                    type="checkbox"
                    onClick={(event) => {
                      const target = event.target as HTMLInputElement;
                      setAgree(target.checked);
                    }}
                  />
                  <span className="ml-1 text-blue-500">이용약관</span> 과&nbsp;
                  <span className="ml-1 text-blue-500">개인정보취급방침</span>
                  에&nbsp;동의합니다.
                </label>
              </div>
            </div>
            <button
              onClick={deleteCurrentUser}
              className="float-right mt-4 max-w-fit disabled:bg-mono30 disabled:text-mono100 valid:bg-brand100 valid:text-white hover:bg-brand100/80 focus:ring-4 focus:outline-none focus:ring-brand100/50 font-medium rounded-sm text-sm px-2 py-2.5 text-center inline-flex items-center dark:hover:bg-brand100/80 dark:focus:ring-brand100/40 mb-2"
              disabled={!agree}
            >
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const { id, userImg } = query as { [key: string]: string };
  const docId = id;
  let userData;
  const snapshot = await getDoc(doc(dbService, "user", docId));
  if (snapshot.exists()) {
    userData = snapshot.data();
    console.log(typeof userData);
  } else {
    console.log("회원 정보가 없습니다.");
  }

  return {
    props: {
      id,
      userData,
      userImg,
    },
  };
};
