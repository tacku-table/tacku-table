import { useEffect, useState } from "react";
import {
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { dbService } from "@/config/firebase";
import Bookmark from "@/components/detailPage/Bookmark";
import SocialShared from "@/components/detailPage/SocialShared";
import TopButton from "@/components/button/TopButton";
import defaultImg from "../../public/images/test1.png";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import Seo from "../../components/layout/Seo";

interface propsType extends AppProps {
  targetWholeData: targetWholeDataType;
  postId: string;
}

interface parseUserType {
  [key: string]: string;
}

export default function DetailReciptPage(props: propsType) {
  const [userData, setUserData] = useState<UserType>({});
  let [views, setViews] = useState<number>(props.targetWholeData?.viewCount);
  const userUid = props.targetWholeData?.uid;
  const [storageCurrentUser, setStorageCurrentUser] = useState<parseUserType>(
    {}
  );

  useEffect(() => {
    //userData조회
    const user = sessionStorage.getItem("User") || "";
    if (user) {
      const parseUser: parseUserType = JSON.parse(user);
      setStorageCurrentUser(parseUser);
    }
    if (!user) {
      setStorageCurrentUser({ user: "guest" });
    }
    //북마크
    setViews((views += 1));
    updateDoc(doc(dbService, "recipe", props.postId), {
      viewCount: views,
    });
    //userData
    onSnapshot(doc(dbService, "user", userUid), (snapshot) => {
      setUserData(snapshot.data() as UserType);
    });
  }, []);

  const toastAlert = (alertText: string) => {
    toast(`${alertText}`, {
      position: "top-right",
      autoClose: 1300,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  //삭제
  const deleteTargetRecipe = async () => {
    const userConfirm = window.confirm("해당 글을 삭제하시겠습니까?");
    const targetBoardId = props.postId;
    if (userConfirm) {
      try {
        await deleteDoc(doc(dbService, "recipe", targetBoardId));
        toastAlert("🗑 게시글이 삭제되었습니다");
        setTimeout(() => {
          location.href = "/search";
        }, 1200);
      } catch (error) {
        console.log("error: ", error);
      }
    }
  };

  // post 시간 나타내는 함수
  const getTimegap = (createdAt: number | string) => {
    let data: number | string = createdAt;
    const date = new Date(data);
    let year = date.getFullYear().toString().slice(-2); //년도
    let month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리
    let day = ("0" + date.getDate()).slice(-2); //일 2자리
    let hour = ("0" + date.getHours()).slice(-2); //시 2자리
    let minute = ("0" + date.getMinutes()).slice(-2); //분 2자리
    return (data = `${year}-${month}-${day} ${hour}:${minute}`);
  };

  return (
    <>
      <Seo title="레시피" />
      <Head>
        {/* 페북 미리보기 */}
        <meta
          property="og:url"
          content="tacku-table-799b.vercel.app
        "
        />
        <meta property="og:title" content={props.targetWholeData?.foodTitle} />
        <meta
          property="og:description"
          content={props.targetWholeData?.animationTitle}
        />
        <meta property="og:image" content={props.targetWholeData?.thumbnail} />
        <meta name="twitter:title" content={props.targetWholeData?.foodTitle} />
      </Head>
      <Head>
        {/* 트위터 미리보기 */}
        <meta
          name="twitter:description"
          content={props.targetWholeData?.animationTitle}
        />
        <meta name="twitter:card" content="photo" />
        <meta
          name="twitter:url"
          content="tacku-table-799b.vercel.app
        "
        />
        <meta name="twitter:image" content={props.targetWholeData?.thumbnail} />
      </Head>

      {/* // 후보 : #FFF8F0 ,#FFF6E8
    // 푸터로 괜찮은애 :#FFF8F0
    // 레시피 배경색 : #FFF7E6
    #cfbbac
    // #b4855c #B9A89B #524439 #f6c8a0 */}
      <div className="xl:w-full sm:w-fit h-full flex flex-col items-center sm:mt-0 mt-20 bg-[#FFF5F5] mx-auto">
        <div className="sm:w-[1180px] w-full sm:my-4 my-0 bg-white sm:pb-[131px] pb-10 sm:pt-[52px] pt-5 sm:px-[200px] px-3">
          <div className="bg-slate-100 w-full sm:h-[440px] h-[250px] overflow-hidden relative">
            <Image
              src={`${props.targetWholeData?.thumbnail}`}
              alt="thumbnail"
              className="image-detail"
              fill
              unoptimized
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
          <div className="flex-col my-5">
            <div className="flex justify-between my-5">
              <p className="text-2xl font-semibold">
                {props.targetWholeData?.foodTitle}
              </p>
              <div className="flex items-center">
                <div className="sm:mr-3 mr-2">
                  <SocialShared targetWholeData={props.targetWholeData} />
                </div>
                {storageCurrentUser.user === "guest" ? null : (
                  <div className="w-10 h-10 mr-2">
                    <Bookmark
                      postId={props.postId}
                      targetWholeData={props.targetWholeData}
                      storageCurrentUser={storageCurrentUser}
                      userData={userData}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <span className="float-left mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor"
                  className="w-4 h-4 text-red100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <p>{props.targetWholeData?.cookingTime}</p>
            </div>
            <div className="sm:flex justify-between border-b-2 border-border-500 sm:pb-8 pb-3 my-5 text-center">
              <p className="flex-1 sm:text-left sm:font-normal font-semibold">
                {props.targetWholeData?.animationTitle}
              </p>
              <div className="flex justify-between sm:flex-1 flex-none sm:mt-0 mt-3">
                <p className="text-white bg-[#F1946C] px-3 rounded-md">
                  {props.targetWholeData?.foodCategory.replaceAll("&", "/")}
                </p>
                <p>{getTimegap(props.targetWholeData?.createdAt)}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between ">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  location.href = `/profile/${userData?.userId}`;
                }}
              >
                {userData?.userImg === "null" ? (
                  <Image
                    src={defaultImg}
                    width={50}
                    height={50}
                    alt="default_img"
                    className="rounded-md hover:opacity-50"
                    unoptimized
                  />
                ) : (
                  <Image
                    src={`${userData?.userImg}`}
                    priority={true}
                    width={50}
                    height={50}
                    alt="user_img"
                    className="rounded-md hover:opacity-50"
                    unoptimized
                  />
                )}
                <p className="pl-5 font-semibold">{userData.userNickname}</p>
              </div>
              {/* 수정/ 삭제 */}
              {props.targetWholeData?.uid == storageCurrentUser.uid ? (
                <div className="flex items-center mt-0 w-[160px]">
                  <Link
                    href={`/recipeEdit/${props.postId}`}
                    className="recipepage-edit-button pt-1"
                  >
                    <p>수정하기</p>
                  </Link>
                  <button
                    className="recipepage-del-button ml-2"
                    type="button"
                    onClick={deleteTargetRecipe}
                  >
                    삭제하기
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <div>
            <p className="text-[24px] border-b-2 border-border-500 pb-3 mt-12 font-semibold">
              재료
            </p>
            <p className="mt-8"> {props.targetWholeData?.ingredient}</p>
          </div>
          <div className="text-[24px] border-b-2 border-border-500 pb-3 mt-16 mb-8 font-semibold">
            <p>레시피</p>
          </div>
          <div className="w-4/5 m-auto text-center items-center">
            <div
              dangerouslySetInnerHTML={{
                __html: props.targetWholeData?.content,
              }}
            />
          </div>
          <div className=" flex justify-between items-center border-b-2 border-border-500 pb-4 mt-11 sm:mb-8 mb-0">
            <div>조회수 : {views}</div>
            <TopButton className="border-2 border-border-500 px-4 py-2 " />
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let targetWholeData;
  const { params, res } = context;
  const { id } = params as { [key: string]: string };
  const postId = id;

  const snap = await getDoc(doc(dbService, "recipe", postId));
  if (snap.exists()) {
    targetWholeData = snap.data();
  } else {
    console.log("가져올 문서가 없습니다.");
    res.setHeader("Location", "/delete");
    res.statusCode = 302;
    return { props: {} };
  }

  if (targetWholeData) {
    targetWholeData = JSON.parse(JSON.stringify(targetWholeData));
  }

  return {
    props: {
      targetWholeData: targetWholeData || null,
      postId: postId || null,
    },
  };
};
