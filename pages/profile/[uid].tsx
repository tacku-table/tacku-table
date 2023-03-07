import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../../config/firebase";
import defaultImg from "../../public/images/test1.png";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import MyTabs from "../../components/profilePage/MyTabs";
import { useRouter } from "next/router";
import { User } from "firebase/auth";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<TUserInfo>();
  const [storageCurrentUser, setStorageCurrentUser] = useState<User>();
  const [isOwner, setIsOwner] = useState({});
  const [imgPreview, setImgPreview] = useState<StaticImageData | string>();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { uid } = router.query;
    const res = {
      uid,
    };
    setIsOwner(res);
    getCurrentUserInfo(uid);
  }, [router.isReady]);

  const getCurrentUserInfo = async (uid: string | string[] | undefined) => {
    await getDoc(doc(dbService, "user", `${uid}`)).then((doc) => {
      const user = {
        ...doc.data(),
      };
      setUserInfo(user as unknown as undefined);
    });
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  });

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("User") || "");
    if (currentUser) {
      setStorageCurrentUser(currentUser);
    } else {
      setStorageCurrentUser("logout" as unknown as undefined);
    }
  }, []);

  useEffect(() => {
    getUserProfileImg(userInfo?.userImg);
  }, [userInfo?.userImg]);

  useEffect(() => {
    if (storageCurrentUser === ("logout" as unknown as undefined)) {
      location.href = "/login";
    }
  }, [storageCurrentUser]);

  const getUserProfileImg = (userImg: string | undefined) => {
    if (userImg === "null") {
      return setImgPreview(defaultImg);
    }
    setImgPreview(userImg);
  };
  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <div>
        <div className="bg-coverBg bg-cover bg-center w-full h-[280px] bg-no-repeat relative">
          <div className="flex justify-center items-center space-x-[24px] absolute left-[370px] top-[151px] text-white">
            {imgPreview && (
              <Image
                src={imgPreview}
                className="rounded-md aspect-square"
                loader={({ src }) => src}
                unoptimized
                priority={true}
                width={100}
                height={100}
                alt="프로필이미지"
              />
            )}
            <p className="text-4xl">{userInfo?.userNickname}</p>
            {storageCurrentUser?.uid === userInfo?.userId && (
              <Link
                legacyBehavior
                href={{
                  pathname: `/profile/edit/${userInfo?.userId}`,
                  query: {
                    id: userInfo?.userId,
                    userImg: userInfo?.userImg,
                  },
                }}
              >
                <svg
                  className="w-9 h-9 cursor-pointer"
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
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
      <MyTabs userInfo={userInfo} storageCurrentUser={storageCurrentUser} />
    </>
  );
};
export default MyPage;
