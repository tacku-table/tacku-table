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
import profile from "../../public/images/profile.jpeg";
import { useCallback, useEffect, useRef, useState } from "react";
import { storage } from "../../config/firebase";
import { pwRegex, nickRegex } from "../../util";

export default function ProfileEdit(props) {
  const [userInfo, setUserInfo] = useState();
  // 프로필이미지 변경
  // const [photoImgURL, setPhotoImgURL] = useState();
  const [imageUpload, setImageUpload] = useState(null);
  const [showUserUpdateImg, setShowUserUpdateImg] = useState();
  const [imgPreview, setImgPreview] = useState();
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
  console.log(props);

  useEffect(() => {
    setUserInfo(props.userData);
    getUserProfileImg();
  }, [userInfo]);

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

  //------------------- 다경 로직 추가----(끝)-----------

  // useEffect(() => {
  //   getUserProfileImg();
  // }, [userInfo]);

  // 인풋값 관리 함수
  const inputChangeSetFunc = (event, setFunction) => {
    setFunction(event.target.value);
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
      setImgPreview(selectedImgUrl);

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
        // let newPw = userInfo;
        // newPw = { ...newPw, userPw: changedPw };

        // setUserInfo(newPw);
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
    await uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        await updateProfile(authService?.currentUser, {
          photoURL: url,
        });
        const docRef = doc(dbService, "user", id);
        updateDoc(docRef, {
          userImg: url,
        }).then(() => console.log("컬렉션 업데이트 성공!"));

        setImgPreview(url);
      });
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-[86px]">
        <span className="text-4xl font-bold">회원정보 수정</span>
        <div className="flex flex-col py-10">
          <div className="flex gap-14 items-center">
            <span className="text-base">프로필 이미지</span>
            {userInfo?.userImg === "null" ? (
              <Image
                src={profile}
                loader={({ src }) => src}
                priority={true}
                width={100}
                height={100}
                alt="기본이미지"
              />
            ) : (
              <Image
                src={showUserUpdateImg}
                loader={({ src }) => src}
                priority={true}
                width={100}
                height={100}
                alt="프리뷰|업데이트이미지"
              />
            )}
            <label>
              <Image
                src={imgPreview}
                loader={({ src }) => src}
                priority={true}
                width={100}
                height={100}
                alt="프리뷰|업데이트이미지"
              />
              <input
                id="picture"
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageFile}
              />
            </label>
            <button
              onClick={() => handleUpdateProfile(userInfo.userId)}
              type="button"
              disabled={!imgPreview}
              className="text-white disabled:bg-slate-400 bg-brand100 hover:bg-brand100/80 focus:ring-4 focus:outline-none focus:ring-brand100/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-brand100/80 dark:focus:ring-brand100/40 mr-2 mb-2"
            >
              프로필이미지 변경
            </button>
          </div>
          <div className="space-y-7">
            <div className="flex gap-14 items-center">
              <span className="text-base min-w-[120px]">이메일</span>
              <input
                disabled
                placeholder={`${userInfo?.userEmail}`}
                className="min-w-[300px] pl-3 border-mono60 border-[1px] h-10"
              />
            </div>
            <div className="flex flex-col">
              <label className="flex gap-14 items-center">
                <span className="text-base min-w-[120px]">비밀번호 변경</span>
                <input
                  type="text" //password로 수정 예정
                  placeholder="변경할 비밀번호를 입력해주세요."
                  onChange={handleChangePassword}
                  className="min-w-[300px] pl-3 border-mono60 border-[1px] h-10 focus:outline-none focus:border-0 focus:ring-2 ring-brand100"
                />
              </label>

              {changeUserPw.length > 0 && (
                <span
                  className={`${isPassword ? "text-blue100" : "text-brand100"}`}
                >
                  {passwordMessage}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="flex gap-14 items-center">
                <span className="text-base min-w-[120px]">
                  비밀번호 변경 확인
                </span>
                <input
                  type="text" //password로 수정 예정
                  placeholder="확인을 위해 비밀번호를 재입력해주세요."
                  onChange={handleChangePasswordConfirm}
                  className="min-w-[300px] pl-3 border-mono60 border-[1px] h-10  focus:outline-none focus:border-0 focus:ring-2 ring-brand100"
                />
              </label>
            </div>
            {confirmChangeUserPw.length > 0 && (
              <span
                className={`${
                  isPasswordConfirm ? "text-blue-600" : "text-orange-500"
                }`}
              >
                {passwordConfirmMessage}
              </span>
            )}
            <div className="flex flex-col">
              <label className="flex gap-14 items-center">
                <span className="text-base min-w-[120px]">닉네임 변경</span>
                <input
                  type="text"
                  onChange={(event) =>
                    handleChangeNickname(event, setChangeUserNickname)
                  }
                  className="min-w-[300px] pl-3 border-mono60 border-[1px] h-10  focus:outline-none focus:border-0 focus:ring-2 ring-brand100"
                />
              </label>
              {changeUserNickname.length > 0 && (
                <span
                  className={`${
                    isPasswordConfirm ? "text-blue-600" : "text-orange-500"
                  }`}
                >
                  {nicknameMessage}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          className="text-white disabled:bg-slate-400 valid:bg-brand100 hover:bg-brand100/80 focus:ring-4 focus:outline-none focus:ring-brand100/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-brand100/80 dark:focus:ring-brand100/40 mr-2 mb-2"
          onClick={() => handleUpdateUserDocs(userInfo.userId)}
          disabled={!(isPassword && isPasswordConfirm && isNickname)}
        >
          수정하기
        </button>
        <button onClick={deleteCurrentUser}>회원탈퇴</button>
      </div>
      <div
        className="hover:opacity-60"
        // onClick={() => setIsEditImg(!isEditImg)}
      >
        {/* <label>
            {isEditImg ? (
              <input
                id="picture"
                type="file"
                accept="image/*"
                onChange={handleImageFile}
              />
            ) : userInfo?.userImg === "null" ? (
              <Image src={profile} width={100} height={100} alt="기본이미지" />
            ) : (
              <img
                src={photoImgURL}
                width={100}
                height={100}
                alt="변경된 이미지"
              />
            )} */}
        {/* </label> */}
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  console.log(context);
  const { query } = context;
  const { id, userImg } = query;
  console.log(id);
  console.log(userImg);

  const docId = id;
  let userData;
  const snapshot = await getDoc(doc(dbService, "user", docId));
  if (snapshot.exists()) {
    console.log(snapshot.data());
    userData = snapshot.data();
  } else {
    console.log("회원 정보가 없습니다.");
  }
  console.log("userData:", userData);

  return {
    props: {
      id,
      userData,
    },
  };
};
