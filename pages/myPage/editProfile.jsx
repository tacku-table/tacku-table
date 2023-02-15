import { authService } from "@/config/firebase";
// import { async } from "@firebase/util";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, listAll, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../config/firebase";
import profile from "../../public/images/profile.svg";
const ProfileEdit = () => {
  // 프로필이미지 업로드 관리
  // 기본값 루트이미지
  const [photoImgURL, setPhotoImgURL] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [defaultImg, setDefaultImg] = useState(profile);
  // 설정버튼 상태체크
  const [isProfileEdit, setIsProfileEdit] = useState(false);

  // fbUser: 로그인 유저
  const fbUser = authService?.currentUser;

  if (fbUser !== null) {
    fbUser.providerData.forEach((profile) => {
      // console.log("Sign-in provider: " + profile.providerId);
      console.log("Provider-specific UID: " + profile.uid);
      // console.log("Name: " + profile.displayName);
      // console.log("Email: " + profile.email);
      console.log("Photo URL: " + profile.photoURL);
    });
  }

  const handleImageFile = (event) => {
    setImageUpload(event.target.files?.[0]);
  };

  // 프로필 닉네임 변경 함수
  const handleUpdateDisplayName = async () => {};

  // 프로필이미지 변경 함수 -> firebase storage
  const handleUpdateProfile = async () => {
    if (imageUpload === null) return;
    // 업로드 로직
    // 예전 프로필 링크를 상태저장 하고 그거랑 변경한 링크랑 다르면 렌더링??
    const imageRef = ref(storage, "profileImage/" + fbUser.uid);
    await uploadBytes(imageRef, imageUpload).then((snapshot) => {
      // 화면에 표시
      getDownloadURL(snapshot.ref).then((url) => {
        updateProfile(fbUser, {
          photoURL: url,
        }).then(() => {
          alert("프로필이미지 업로드 성공");
          console.log(fbUser.photoURL);
        });
        console.log(url);
        // setPhotoURL((prev) => [...prev, url]);
        setPhotoImgURL(url);
      });
    });
  };
  const imageListRef = ref(storage, "profileImage/");
  // useEffect(() => {
  //   if (fbUser.photoURL !== photoImgURL) {
  //     setPhotoImgURL(fbUser.photoURL);
  //   }
  // }, [photoImgURL]);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          if (url === fbUser.photoURL) {
            setPhotoImgURL(url);
          }
        });
      });
    });
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <span>{fbUser?.displayName}</span>
        {/* 프로필 이미지 */}
        <div className="w-12 h-12">
          {fbUser?.photoURL === null ? (
            <img src={defaultImg} alt="기본이미지1" />
          ) : (
            <img src={photoImgURL} alt="updateProfileImg" />
          )}
        </div>
        <div className="flex flex-col">
          <div onClick={() => setIsProfileEdit(!isProfileEdit)}>
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </div>
          {isProfileEdit && (
            <div>
              <label className="w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
                <svg
                  className="h-12 w-12"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  hidden
                />
              </label>
              <button onClick={handleUpdateProfile}>업로드</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
