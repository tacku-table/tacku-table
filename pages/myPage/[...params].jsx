import { authService, dbService } from "../../config/firebase";
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
import defaultImg from "../../public/images/test1.png";
import { useCallback, useEffect, useRef, useState } from "react";
import { storage } from "../../config/firebase";
import { pwRegex, nickRegex, cls } from "../../util";
import { useRouter } from "next/router";

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
  const [changeUserPw, setChangeUserPw] = useState("");
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
    getUserProfileImg();
  }, [userInfo]);

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
      // alert("로그아웃\n 메인 화면으로 이동합니다.");
      location.href = "/loginPage";
    }
  }, [storageCurrentUser]);

  //----------------다경 로직 추가-------(시작)------------

  const deleteCurrentUser = () => {
    const currentUser = authService.currentUser;

    if (currentUser) {
      const result = confirm("정말 회원탈퇴를 하실건가요?🥹");
      console.log("result:", result);
      console.log("currentUser:", currentUser);

      if (result) {
        signOut(authService).then(() => {
          sessionStorage.clear();
          deleteUser(currentUser)
            .then(() => {
              alert("회원탈퇴가 완료되었습니다.");
              location.href = "/mainPage";
            })
            .catch((error) => {
              console.log(error);
            });
        });
      } else {
        return false;
      }
    }
  };

  const getUserProfileImg = async () => {
    if (userInfo?.userImg === "null") return;
    const imageListRef = ref(storage, "profileImage/");
    await listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          if (url === userInfo?.userImg) {
            setShowUserUpdateImg(url);
          }
        });
      });
    });
  };

  // div를 클릭해도 input이 클릭되도록 하기
  // const fileRef = useRef(null);
  // const onClickUpload = () => {
  //   fileRef.current?.click();
  // };
  const handleImageFile = (event) => {
    const file = event.target.files?.[0];
    setImageUpload(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // console.log("파일 정상적으로 불러옴");
      const selectedImgUrl = reader.result;
      console.log("selectedImgUrl", selectedImgUrl);
      setShowUserUpdateImg(selectedImgUrl);

      // setImageUpload(event.target.files?.[0]);
    };
  };

  const handleChangePassword = useCallback(
    (event) => {
      const changedPw = event.target.value;
      console.log(changedPw);
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
      // console.log(confirmedPW);
      // console.log(confirmChangeUserPw);
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
    const docId = uid;
    const docRef = doc(dbService, "user", docId);
    // console.log("userInfo.userPw", userInfo.userPw);
    const userProvidedPassword = userInfo.userPw;
    const credential = EmailAuthProvider.credential(
      authService?.currentUser.email,
      userProvidedPassword
    );
    // const userImg = url;
    await updateDoc(docRef, {
      userNickname: changeUserNickname,
      userPw: changeUserPw,
    }).then(() => console.log("컬렉션 업데이트 성공!"));
    await reauthenticateWithCredential(
      authService.currentUser,
      credential
    ).then(async () => {
      await updatePassword(authService?.currentUser, changeUserPw)
        .then(() => console.log("비밀번호 변경 완료!"))
        .catch((error) => console.log("비밀번호 변경 에러: ", error));
      await updateProfile(authService?.currentUser, {
        displayName: changeUserNickname,
      })
        .then(() => {
          console.log("닉네임 변경 완료!");
          // sessionStorage.clear();
          // sessionStorage.setItem("User", JSON.stringify(authService.currentUser));
          // 변경 완료 후 마이페이지 메인으로 보냅니다. (임시)
          location.href = `/myPage`;
        })
        .catch((error) => console.log("닉네임 변경 에러: ", error));
    });
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
          setImgPreview("uploading"); //ㅇㅣ게 먼저뜸
          console.log("컬렉션 업데이트 성공!");
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
            <span className="text-base  min-w-[120px]">프로필 이미지</span>
            <div className="flex items-end space-x-5">
              <label className="cursor-pointer hover:opacity-40">
                {userInfo?.userImg === "null" ? (
                  <Image
                    src={defaultImg}
                    className="rounded-md aspect-square"
                    // loader={({ src }) => src}
                    priority={true}
                    width={100}
                    height={100}
                    alt="기본이미지"
                  />
                ) : (
                  <Image
                    src={showUserUpdateImg}
                    className="rounded-md aspect-square"
                    loader={({ src }) => src}
                    priority={true}
                    width={100}
                    height={100}
                    alt="프리뷰|업데이트이미지"
                  />
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
                  onClick={() => handleUpdateProfile(userInfo.userId)}
                  type="button"
                  disabled={!imageUpload}
                  className="text-white disabled:bg-slate-400 bg-brand100 hover:bg-brand100 focus:ring-4 focus:outline-none focus:ring-brand100/50 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-brand100/80 dark:focus:ring-brand100/40 "
                >
                  변경
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
            <label className="flex gap-14 items-center">
              <span className="text-base min-w-[120px] ">비밀번호 변경</span>
              <div>
                <input
                  type="text" //password로 수정 예정
                  placeholder="변경할 비밀번호를 입력해주세요."
                  onChange={handleChangePassword}
                  className="min-w-[300px] pl-3 border-mono60 border-[1px] h-10 focus:outline-none focus:border-0 focus:ring-2 ring-brand100"
                />
                <div className="h-[16px]">
                  {changeUserPw.length > 0 && (
                    <span
                      className={cls(
                        "text-xs",
                        `${
                          isPassword ? "text-xs text-blue100" : "text-brand100"
                        }`
                      )}
                    >
                      {passwordMessage}
                    </span>
                  )}
                </div>
              </div>
            </label>
          </div>
          <div className="flex flex-col">
            <label className="flex gap-14 items-center">
              <span className="text-base min-w-[120px]">
                비밀번호 변경 확인
              </span>
              <div>
                <input
                  type="text" //password로 수정 예정
                  placeholder="확인을 위해 비밀번호를 재입력해주세요."
                  onChange={handleChangePasswordConfirm}
                  className="min-w-[300px] pl-3 border-mono60 border-[1px] h-10  focus:outline-none focus:border-0 focus:ring-2 ring-brand100"
                />

                <div className="h-[16px]">
                  {confirmChangeUserPw.length > 0 && (
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
          <div className="flex flex-col">
            <label className="flex gap-14 items-center">
              <span className="text-base min-w-[120px]">닉네임 변경</span>
              <div>
                <input
                  type="text"
                  onChange={(event) =>
                    handleChangeNickname(event, setChangeUserNickname)
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
              <span className="ml-1 text-blue-500">개인정보취급방침</span>
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
            disabled={!(isPassword && isPasswordConfirm && isNickname)}
          >
            수정하기
          </button>
          <button
            onClick={() => router.back()}
            className="text-mono100 bg-mono30 hover:bg-brand100 hover:text-white focus:ring-4 focus:outline-none focus:ring-brand100/50 font-medium rounded-sm text-sm px-28 py-2.5 text-center inline-flex items-center dark:hover:bg-brand100/80 dark:focus:ring-brand100/40 mb-2"
            // disabled={isPassword && isPasswordConfirm && isNickname}
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
  // console.log(id);
  // console.log(userImg);

  const docId = id;
  let userData;
  const snapshot = await getDoc(doc(dbService, "user", docId));
  if (snapshot.exists()) {
    // console.log(snapshot.data());
    userData = snapshot.data();
  } else {
    alert("회원 정보가 없습니다.");
  }
  // console.log("userData:", userData);

  return {
    props: {
      id,
      userData,
    },
  };
};
