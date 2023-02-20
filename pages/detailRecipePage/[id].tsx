import { useEffect, useState, useRef } from "react";
import { onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";
import { dbService } from "@/config/firebase";
import { useRouter } from "next/router";
import Bookmark from "@/components/detail/Bookmark";

//자식한테 props로 타입 넘겨줬는데 왜 오류가 날까...
export default function DetailReciptPage(props: any) {
  //레시피 데이터
  const [recipeData, getRecipeData] = useState<any>("");
  const [userData, setUserData] = useState<any>("");
  //조회수
  let [views, setViews] = useState<number>(props.targetWholeData.viewCount);

  //레시피 데이터 불러오기
  useEffect(() => {
    getRecipeData(props.targetWholeData);
  }, []);

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

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="border-2 border-rose-600 w-[1180px] h-[447px] flex justify-center items-center my-12">
        <div className="bg-slate-100 w-1/2 h-96 overflow-hidden ml-8 float-left">
          <img
            src={recipeData.thumbnail}
            alt="thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-1/2 h-96 float-right  mx-11 ">
          <div>카테고리 : {recipeData.foodCategory}</div>
          <div className="text-4xl font-bold">
            음식제목 : {recipeData.foodTitle}
          </div>
          <div className="text-base">영화 : {recipeData.animationTitle}</div>
          <div>요리시간 : {recipeData.cookingTime}</div>
          <div>닉네임 : {recipeData.writerNickName}</div>
          <Bookmark
            postId={props.postId}
            recipeData={recipeData}
            userData={userData}
          />
          <div>조회수 : {views}</div>
        </div>
      </div>
      <div>재료 : {recipeData.ingredient}</div>
      <div dangerouslySetInnerHTML={{ __html: recipeData.content }} />
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
    console.log("No such document");
  }

  //해결한 코드
  // 제이슨 전달할때 객체안의 객체 넣지말라고 오류났었음
  targetWholeData = JSON.parse(JSON.stringify(targetWholeData));

  //pageProps로 넘길 데이터
  return { props: { targetWholeData, postId } };
};
