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
  // const { uid } = JSON.parse(sessionStorage.getItem("User"));
  const [showUserImg, setShowUserImg] = useState(defaultImg);
  const [showUserUpdateImg, setShowUserUpdateImg] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  // useEffect(() => {
  //   const currentUser = JSON.parse(sessionStorage.getItem("User"));
  //   console.log(currentUser);
  // }, []);

  // getCurrentUserInfo(uid);
  // getUserProfileImg();

  const getCurrentUserInfo = async (id) => {
    await getDoc(doc(dbService, "user", id)).then((doc) => {
      console.log("getCurrentUserInfo의 data: ", doc.data());
      const user = {
        ...doc.data(),
      };
      setUserInfo(user);
    });
  };

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("User"));
    console.log(currentUser);
    getCurrentUserInfo(currentUser.uid);
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="mb-4">
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

        <Link
          legacyBehavior
          href={{
            pathname: `/myPage/editProfile/`,
            query: {
              id: userInfo.userId,
            },
          }}
        >
          <a className="mb-4">수정하러 가기</a>
        </Link>
        <MyTabs userInfo={userInfo} setUserInfo={setUserInfo} />
      </div>
    </>
  );
};

export default MyPage;
