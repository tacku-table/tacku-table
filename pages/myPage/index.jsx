import { authService } from "@/config/firebase";
import { collection, getDoc, query, doc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService, storage } from "../../config/firebase";
import defaultImg from "../../public/images/profile.jpeg";
import Link from "next/link";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import Image from "next/image";
import MyTabs from "../../components/myTab/MyTabs";
const MyPage = () => {
  const [userInfo, setUserInfo] = useState([]);
  const { uid } = JSON.parse(sessionStorage.getItem("User"));
  const [showUserImg, setShowUserImg] = useState(defaultImg);
  const [showUserUpdateImg, setShowUserUpdateImg] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const currentUser = JSON.parse(sessionStorage.getItem("User"));
  console.log(currentUser);

  // getCurrentUserInfo(uid);
  // getUserProfileImg();

  const getCurrentUserInfo = async () => {
    await getDoc(doc(dbService, "user", currentUser.uid)).then((doc) => {
      console.log("getCurrentUserInfo의 data: ", doc.data());
      const user = {
        ...doc.data(),
      };
      setUserInfo(user);
    });
  };
  // 이미지 loader 함수
  // const src = userInfo.userImg;

  useEffect(() => {
    getCurrentUserInfo();
  }, []);

  // 프로필이미지가 ""면, 기본 지정이미지 보이게 해주자

  // 프로필 변경 함수
  const handleUpdateProfile = () => {};

  return (
    <>
      <div className="flex flex-col">
        <div className="mb-10">
          <div>
            {userInfo.userImg === "null" ? (
              <Image
                src={defaultImg}
                width={100}
                height={100}
                alt="default_img"
              />
            ) : (
              // <img src={userInfo.userImg} />
              <Image
                // onMouseEnter={() => console.log("마우스")}
                src={userInfo.userImg}
                priority={true}
                loader={({ src }) => src}
                width={100}
                height={100}
                alt="user_img"
              />
            )}
            <p>닉네임: {userInfo.userNickname}</p>
            <p>이메일: {userInfo.userEmail}</p>
            {/* <Image src={}/> */}
          </div>
        </div>

        <MyTabs userInfo={userInfo} setUserInfo={setUserInfo} />

        <Link
          legacyBehavior
          href={{
            pathname: `/myPage/editProfile/`,
            query: {
              id: userInfo.userId,
            },
          }}
        >
          <a>수정하러 가기</a>
        </Link>
      </div>
    </>
  );
};

export default MyPage;
