import { authService, dbService } from "../../config/firebase";
import {
  updatePassword,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, listAll, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { storage } from "../../config/firebase";
import { pwRegex, nickRegex } from "../../util";
import { async } from "@firebase/util";

const ProfileEdit = () => {
  const [userInfo, setUserInfo] = useState();
  // 프로필이미지 변경
  const [photoImgURL, setPhotoImgURL] = useState();
  const [imageUpload, setImageUpload] = useState(null);
  const [isEditImg, setIsEditImg] = useState(false);
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

  const router = useRouter();
  const id = router.query.id;

  // const currentUser = JSON.parse(sessionStorage.getItem("User"));
  // const id = router.query.id;

  const getCurrentUserInfo = async (uid) => {
    const docId = uid;
    await getDoc(doc(dbService, "user", docId)).then((doc) => {
      const user = {
        ...doc.data(),
      };
      setUserInfo(user);
    });
  };
  // useEffect(() => {
  //   getCurrentUserInfo();
  // }, [userInfo]);
  useEffect(() => {
    const { uid } = JSON.parse(sessionStorage.getItem("User"));
    console.log(uid);
    getCurrentUserInfo(uid);
  }, []);

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

  // 인풋값 관리 함수
  const inputChangeSetFunc = (event, setFunction) => {
    setFunction(event.target.value);
  };

  // div를 클릭해도 input이 클릭되도록 하기
  // const fileRef = useRef(null);
  // const onClickUpload = () => {
  //   fileRef.current?.click();
  // };

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
        console.log(confirmChangeUserPw);
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
    const userProvidedPassword = userInfo.userPw;
    const credential = EmailAuthProvider.credential(
      authService.currentUser.email,
      userProvidedPassword
    );
    // const userImg = url;
    await updateDoc(docRef, {
      userNickname: changeUserNickname,
      userPw: changeUserPw,
    }).then(() => console.log("컬렉션 업데이트 성공!"));
    reauthenticateWithCredential(authService.currentUser, credential).then(
      () => {
        updatePassword(authService?.currentUser, changeUserPw)
          .then(() => console.log("비밀번호 변경 완료!"))
          .catch((error) => console.log("비밀번호 변경 에러: ", error));
      }
    );
    await updateProfile(authService?.currentUser, {
      displayName: changeUserNickname,
    })
      .then(() => console.log("닉네임 변경 완료!"))
      .catch((error) => console.log("닉네임 변경 에러: ", error));
    // getDoc(doc(dbService, "user", userInfo.userId)).then((doc) => {
    //   const data = doc.data();
    //   console.log(data);
    //   // setUserInfo(data);
    // });
  };
  // 닉네임, 비밀번호, 이미지 같이 업로드
  const handleUpdateProfile = async (id) => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `profileImage/${id}`);
    await uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        updateProfile(authService?.currentUser, {
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
      <div>
        <div className="flex flex-col">
          <input
            id="picture"
            type="file"
            accept="image/*"
            onChange={handleImageFile}
          />
          <Image
            src={imgPreview}
            loader={({ src }) => src}
            priority={true}
            width={100}
            height={100}
            alt="프리뷰"
          />
          <button onClick={() => handleUpdateProfile(userInfo.userId)}>
            프로필이미지 업로드
          </button>
          <label>
            비밀번호 변경:
            <input
              type="text" //password로 수정 예정
              placeholder="변경할 비밀번호를 입력해주세요."
              onChange={handleChangePassword}
              className="w-[256px] border border-black"
            />
          </label>
          {changeUserPw.length > 0 && (
            <span
              className={`${isPassword ? "text-blue-600" : "text-orange-500"}`}
            >
              {passwordMessage}
            </span>
          )}
          <label>
            비밀번호 재확인:
            <input
              type="text" //password로 수정 예정
              placeholder="확인을 위해 비밀번호를 재입력해주세요."
              onChange={handleChangePasswordConfirm}
              className="w-[256px] border border-black"
            />
          </label>
          {confirmChangeUserPw.length > 0 && (
            <span
              className={`${
                isPasswordConfirm ? "text-blue-600" : "text-orange-500"
              }`}
            >
              {passwordConfirmMessage}
            </span>
          )}
          <label>
            닉네임 변경:
            <input
              type="text"
              onChange={(event) =>
                handleChangeNickname(event, setChangeUserNickname)
              }
              className="w-[256px] border border-black"
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
          <button
            className="w-16 valid:bg-orange-400 disabled:bg-slate-400"
            onClick={() => handleUpdateUserDocs(userInfo.userId)}
            disabled={!(isPassword && isPasswordConfirm && isNickname)}
          >
            수정하기
          </button>
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
      </div>
    </>
  );
};

export default ProfileEdit;
