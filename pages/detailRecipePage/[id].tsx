import { useEffect, useState } from "react";
import {
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { dbService } from "@/config/firebase";
import Bookmark from "@/components/detail/Bookmark";
import TopButton from "@/components/button/TopButton";
import defaultImg from "../../public/images/test1.png";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { GetServerSideProps } from "next";

export default function DetailReciptPage(props: any) {
  //회원 데이터
  const [userData, setUserData] = useState<any>("");
  //조회수
  let [views, setViews] = useState<number>(props.targetWholeData?.viewCount);
  const userUid = props.targetWholeData?.uid;
  const [storageCurrentUser, setStorageCurrentUser]: any = useState({});
  useEffect(() => {
    const user = sessionStorage.getItem("User") || "";
    if (user) {
      const parseUser = JSON.parse(user);
      setStorageCurrentUser(parseUser);
    }
    if (!user) {
      setStorageCurrentUser("guest");
    }
  }, []);

  //조회수
  useEffect(() => {
    setViews((views += 1));
    updateDoc(doc(dbService, "recipe", props.postId), {
      viewCount: views,
    });
  }, []);

  //레시피 데이터 불러오기
  useEffect(() => {
    //getRecipeData(props.targetWholeData);
    onSnapshot(doc(dbService, "user", userUid), (snapshot) => {
      setUserData(snapshot.data());
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
    console.log("props.postId", props.postId);
    const targetBoardId = props.postId;
    if (userConfirm) {
      try {
        await deleteDoc(doc(dbService, "recipe", targetBoardId));
        // toast.warn("🗑 게시글이 삭제되었습니다");
        toastAlert("🗑 게시글이 삭제되었습니다");
        setTimeout(() => {
          location.href = "/searchPage";
        }, 1200);
      } catch (error) {
        console.log("error: ", error);
      }
    }
  };

  // post 시간 나타내는 함수
  const getTimegap = (createdAt: any) => {
    let data = createdAt;
    const date = new Date(data);
    let year = date.getFullYear().toString().slice(-2); //년도
    let month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리
    let day = ("0" + date.getDate()).slice(-2); //일 2자리
    let hour = ("0" + date.getHours()).slice(-2); //시 2자리
    let minute = ("0" + date.getMinutes()).slice(-2); //분 2자리
    return (data = `${year}-${month}-${day} ${hour}:${minute}`);
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-mono40 ">
      <div className=" w-[1180px] my-4 bg-white pb-[131px] pt-[52px] px-[200px]">
        <div className="bg-slate-100 w-full h-[440px] overflow-hidden relative">
          <Image
            src={`${props.targetWholeData?.thumbnail}`}
            alt="thumbnail"
            className="image-detail"
            fill
            unoptimized
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className="flex-col my-5">
          <div className="flex justify-between my-5">
            <p className="text-2xl font-semibold">
              {props.targetWholeData?.foodTitle}
            </p>

            {storageCurrentUser === "guest" ? null : (
              <p className="w-6 h-6 mr-2">
                <Bookmark
                  postId={props.postId}
                  targetWholeData={props.targetWholeData}
                  storageCurrentUser={storageCurrentUser}
                  userData={userData}
                />
              </p>
            )}
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
          <div className="flex justify-between border-b-2 border-border-500 pb-8 my-5">
            <p> {props.targetWholeData?.animationTitle}</p>
            <p>{props.targetWholeData?.foodCategory.replaceAll("&", "/")}</p>
            <p>{getTimegap(props.targetWholeData?.createdAt)}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between ">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => {
                location.href = `/myPage/${userData?.userId}`;
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
              <div className="flex">
                <Link
                  href={`/recipeEditPage/${props.postId}`}
                  className="recipepage-edit-button pt-1"
                >
                  <p>수정하기</p>
                </Link>
                <button
                  className="recipepage-del-button  ml-2"
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
            dangerouslySetInnerHTML={{ __html: props.targetWholeData?.content }}
          />
        </div>
        <div className=" flex justify-between items-center border-b-2 border-border-500 pb-4 mt-11 mb-8 ">
          <div>조회수 : {views}</div>
          <TopButton className="border-2 border-border-500 px-4 py-2 " />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let targetWholeData;
  const { params, res } = context;
  const { id }: any = params;
  //페이지 해당 id
  const postId = id;
  const snap = await getDoc(doc(dbService, "recipe", postId));
  if (snap.exists()) {
    targetWholeData = snap.data();
  } else {
    console.log("가져올 문서가 없습니다.");
    res.setHeader("Location", "/deletePage");
    res.statusCode = 302;
    return { props: {} };
  }

  // 해결한 코드
  // 제이슨 전달할때 객체안의 객체 넣지말라고 오류났었음
  // targetWholeData = JSON.parse(JSON.stringify(targetWholeData));

  //--------------에러 2.22 ------
  // SyntaxError: Unexpected token u in JSON at position 0 at JSON.parse
  // 해결 : if문 안으로 넣음

  if (targetWholeData) {
    targetWholeData = JSON.parse(JSON.stringify(targetWholeData));
  }

  //--------------에러 2.22 ------
  //`undefined` cannot be serialized as JSON. Please use `null` or omit this value
  // 해결 : or연산자로 null 을 달아줌
  return {
    props: {
      targetWholeData: targetWholeData || null,
      postId: postId || null,
    },
  };
};
