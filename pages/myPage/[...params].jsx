import { authService, dbService } from "../../config/firebase";
// import { async } from "@firebase/util";
import { updatePassword, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, listAll, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import profile from "../../public/images/profile.jpeg";
import { storage } from "../../config/firebase";
const ProfileEdit = () => {
  const [userInfo, setUserInfo] = useState({});
  const [uid, setUid] = useState("");
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
  const [changeUserNickname, setChangeUserNickname] = useState("");

  const router = useRouter();

  const currentUser = authService?.currentUser;
  // console.log(currentUser);

  useEffect(() => {
    // const uid = router.query.id;
    const sessionStorageUser = sessionStorage.getItem("User");
    const parsingUser = JSON.parse(sessionStorageUser);
    setUid(parsingUser?.uid);
    // console.log("uid", uid);
    // getCurrentUserInfo(uid);
    // getUserProfileImg();
  }, []);
  const getCurrentUserInfo = async (currentUserUid) => {
    await getDoc(doc(dbService, "user", currentUserUid)).then((doc) => {
      setUserInfo(doc.data());
    });
  };

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
    };
    // setImageUpload(event.target.files?.[0]);
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

  // 닉네임, 비밀번호, 이미지 같이 업로드
  const handleUpdateProfile = async (uid) => {
    const docRef = doc(dbService, "user", uid);
    // if (imageUpload === null) return;
    const imageRef = ref(storage, `profileImage/${uid}`);
    await uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // updatePassword(currentUser, changeUserPw)
        //   .then(() => console.log("비밀번호 변경 완료!"))
        //   .catch((error) => console.log("비밀번호 변경 에러: ", error));
        updateProfile(currentUser, {
          displayName: changeUserNickname,
          photoURL: url,
        })
          .then(() => console.log("닉네임 변경 완료!"))
          .catch((error) => console.log("닉네임 변경 에러: ", error));
        updateDoc(docRef, {
          userImg: url,
          userNickname: changeUserNickname,
          userPw: changeUserPw,
        }).then(() => {
          alert("프로필이미지 업로드 성공");
          console.log(url);
        });
        setImgPreview(url);
        // setPhotoURL((prev) => [...prev, url]);
      });
    });
  };

  const getUserProfileImg = async () => {
    if (userInfo?.userImg === "null") return;
    const imageListRef = ref(storage, "profileImage/");
    await listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          if (url === userInfo?.userImg) {
            setPhotoImgURL(url);
          }
        });
      });
    });
  };

  return (
    <>
      <div>
        <form
          className="flex flex-col"
          onSubmit={() => handleUpdateProfile(uid)}
        >
          <input
            id="picture"
            type="file"
            accept="image/*"
            onChange={handleImageFile}
          />
          <img src={imgPreview} width={100} height={100} alt="프리뷰" />
          {/* <label>
            비밀번호 변경:
            <input
              type="text"
              onChange={(event) => inputChangeSetFunc(event, setChangeUserPw)}
              className="w-[256px] border border-black"
            />
          </label>
          <label>
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

          <input type="submit" value="수정하기" />
        </form>
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
