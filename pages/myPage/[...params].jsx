import { authService, dbService } from "../../config/firebase";
// import { async } from "@firebase/util";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  listAll,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import profile from "../../public/images/profile.jpeg";
import { storage } from "../../config/firebase";
const ProfileEdit = () => {
  const [userInfo, setUserInfo] = useState({});
  const [photoImgURL, setPhotoImgURL] = useState();
  const [imageUpload, setImageUpload] = useState(null);
  const [isEditImg, setIsEditImg] = useState(false);

  const router = useRouter();
  const getCurrentUserInfo = async (currentUserUid) => {
    await getDoc(doc(dbService, "user", currentUserUid)).then((doc) => {
      setUserInfo(doc.data());
    });
  };
  useEffect(() => {
    const id = router.query.id;
    getCurrentUserInfo(id);
    getUserProfileImg();
  });

  const handleImageFile = (event) => {
    setImageUpload(event.target.files?.[0]);
  };
  // div를 클릭해도 input이 클릭되도록 하기
  const fileRef = useRef(null);
  const onClickUpload = () => {
    fileRef.current?.click();
  };
  // 프로필 닉네임 변경 함수
  const handleUpdateDisplayName = async () => {};

  const handleUpdateProfile = async () => {
    // if (imageUpload === null) return;
    const imageRef = ref(storage, "profileImage/" + userInfo.userId);
    await uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        await updateProfile(authService?.currentUser, {
          photoURL: url,
        });
        await updateDoc(doc(dbService, "user", userInfo?.userId), {
          userImg: url,
        }).then(() => {
          alert("프로필이미지 업로드 성공");
          setPhotoImgURL(url);
          console.log(url);
        });
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
      <div className="flex justify-between">
        <div
          className="hover:opacity-60"
          onClick={() => setIsEditImg(!isEditImg)}
        >
          <label>
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
            )}
          </label>
        </div>
        <button onClick={handleUpdateProfile}>업로드</button>
      </div>
    </>
  );
};

export default ProfileEdit;
