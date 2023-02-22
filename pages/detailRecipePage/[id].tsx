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

export default function DetailReciptPage(props: any) {
  //레시피 데이터
  const [recipeData, getRecipeData] = useState<any>("");
  //회원 데이터
  const [userData, setUserData] = useState<any>("");
  const [userFireData, setUserFireData] = useState<any>("");
  //조회수
  let [views, setViews] = useState<number>(props.targetWholeData?.viewCount);
  const userUid = props.targetWholeData?.uid;

  //레시피 데이터 불러오기
  useEffect(() => {
    getRecipeData(props.targetWholeData);
    onSnapshot(doc(dbService, "user", userUid), (snapshot) => {
      setUserFireData(snapshot.data());
    });
  }, []);

  // post 시간 나타내는 함수
  const getTimegap = () => {
    let data: any = Date.now();
    const date = new Date(data);
    let year = date.getFullYear().toString().slice(-2); //년도
    let month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리
    let day = ("0" + date.getDate()).slice(-2); //일 2자리
    let hour = ("0" + date.getHours()).slice(-2); //시 2자리
    let minute = ("0" + date.getMinutes()).slice(-2); //분 2자리
    return (data = `${year} .${month}. ${day} .${hour}:${minute}`);
  };
  //----------다경 추가---------------(시작)
  const [storageCurrentUser, setStorageCurrentUser]: any = useState({});
  useEffect(() => {
    const user = sessionStorage.getItem("User") || "";
    if (user) {
      const parseUser = JSON.parse(user);
      setStorageCurrentUser(parseUser);
    }
  }, []);
  //----------다경 추가---------------(끝)

  //조회수
  useEffect(() => {
    setViews((views += 1));
    updateDoc(doc(dbService, "recipe", props.postId), {
      viewCount: views,
    });
  }, []);

  useEffect(() => {
    const sessionStorageUser = sessionStorage.getItem("User") || "";
    if (sessionStorageUser) {
      const parsingUser = JSON.parse(sessionStorageUser);
      setUserData(parsingUser?.uid);
    }
    if (!sessionStorageUser) {
      setUserData("geust");
    }
  }, []);
  //----------------다경 추가한 부분(시작)--------------------
  const deleteTargetRecipe = async () => {
    const userConfirm = window.confirm("해당 글을 삭제하시겠습니까?");
    console.log("props.postId", props.postId);
    const targetBoardId = props.postId;
    if (userConfirm) {
      try {
        await deleteDoc(doc(dbService, "recipe", targetBoardId));
        alert("게시물이 삭제되었습니다.");
        location.href = "/mainPage";
      } catch (error) {
        console.log("error: ", error);
      }
    }
  };
  //----------------다경 추가한 부분(끝)--------------------

  return (
    <div className="w-full h-full flex flex-col items-center bg-mono40 ">
      <div className=" w-[1180px] my-4 bg-white pb-[131px] pt-[52px] px-[200px]">
        <div className="bg-slate-100 w-full h-[440px] overflow-hidden relative">
          <Image
            src={`${recipeData.thumbnail}`}
            alt="thumbnail"
            className="image-detail"
            fill
            unoptimized
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className="flex-col my-5">
          <div className="flex justify-between my-5">
            <p className="text-2xl font-semibold">{recipeData.foodTitle}</p>
            {userData === "geust" ? null : (
              <p className="w-6 h-6">
                <Bookmark postId={props.postId} recipeData={recipeData} />
              </p>
            )}
          </div>
          <div className="flex items-center">
            <span className="float-left mr-2 ">
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
            <p>{recipeData.cookingTime}</p>
          </div>
          <div className="flex justify-between border-b-2 border-border-500 pb-8 my-5">
            <p> {recipeData.animationTitle}</p>
            <p>{recipeData.foodCategory}</p>
            <p>{getTimegap()}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between ">
            <div className="flex items-center">
              {userFireData.userImg === "null" ? (
                <Image
                  src={defaultImg}
                  width={50}
                  height={50}
                  alt="default_img"
                  className="rounded-md"
                  unoptimized
                />
              ) : (
                <Image
                  src={`${userFireData.userImg}`}
                  priority={true}
                  width={50}
                  height={50}
                  alt="user_img"
                  className="rounded-md"
                  unoptimized
                />
              )}
              <p className="pl-5 font-semibold">{userFireData.userNickname}</p>
            </div>
            {/* 수정/ 삭제 */}
            {props.targetWholeData?.uid == storageCurrentUser.uid ? (
              <div className="flex">
                <div className="recipepage-edit-button pt-1">
                  <Link href={`/recipeEditPage/${props.postId}`}>수정하기</Link>
                </div>
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
          <p className=" border-b-2 border-border-500 pb-3 mt-12 font-semibold">
            재료
          </p>
          <p className="mt-8"> {recipeData.ingredient}</p>
        </div>
        <div className=" border-b-2 border-border-500 pb-3 mt-16 mb-8 font-semibold">
          <p>레시피</p>
        </div>
        <div className="w-4/5 m-auto text-center items-center">
          <div dangerouslySetInnerHTML={{ __html: recipeData.content }} />
        </div>
        <div className=" flex justify-between items-center border-b-2 border-border-500 pb-4 mt-11 mb-8 ">
          <div>조회수 : {views}</div>
          <TopButton className="border-2 border-border-500 px-4 py-2 " />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: any = async (context: any) => {
  let targetWholeData;
  const { params } = context;
  const { id } = params;
  //페이지 해당 id
  const postId = id;
  const snap = await getDoc(doc(dbService, "recipe", postId));
  if (snap.exists()) {
    targetWholeData = snap.data();
  } else {
    console.log("가져올 문서가 없습니다.");
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
    props: { targetWholeData: targetWholeData || null, postId: postId || null },
  };
};
