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
import { useEffect, useRef, useState } from "react";
import profile from "../../public/images/profile.jpeg";
import { storage } from "../../config/firebase";
import { async } from "@firebase/util";
const ProfileEdit = () => {
  const [userInfo, setUserInfo] = useState();
  // 프로필이미지 변경
  const [photoImgURL, setPhotoImgURL] = useState();
  const [imageUpload, setImageUpload] = useState(null);
  const [isEditImg, setIsEditImg] = useState(false);
  const [imgPreview, setImgPreview] = useState();
  // 비밀번호 변경
  const [changeUserPw, setChangeUserPw] = useState("");
  // 비밀번호 확인
  const [confirmChangeUserPw, setConfirmChangeUserPw] = useState("");
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
    // if (imageUpload === null) return;
    const imageRef = ref(storage, `profileImage/${id}`);
    await uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        updateProfile(authService?.currentUser, {
          photoURL: url,
        });
        setImgPreview(url);
      });
    });
  };

  // const getUserProfileImg = async () => {
  //   if (userInfo?.userImg === "null") return;
  //   const imageListRef = ref(storage, "profileImage/");
  //   await listAll(imageListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         if (url === userInfo?.userImg) {
  //           setPhotoImgURL(url);
  //         }
  //       });
  //     });
  //   });
  // };

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
              type="text"
              onChange={(event) => inputChangeSetFunc(event, setChangeUserPw)}
              className="w-[256px] border border-black"
            />
          </label>
          {/* <label>
            비밀번호 확인:
            <input
              type="text"
              onChange={(event) =>
                inputChangeSetFunc(event, setConfirmChangeUserPw)
              }
              className="w-[256px] border border-black"
            />
          </label> */}
          <label>
            닉네임 변경:
            <input
              type="text"
              onChange={(event) =>
                inputChangeSetFunc(event, setChangeUserNickname)
              }
              className="w-[256px] border border-black"
            />
          </label>

          <button onClick={() => handleUpdateUserDocs(userInfo.userId)}>
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
