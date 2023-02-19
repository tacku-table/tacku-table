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
  let [views, setViews] = useState<number>(props.targetWholeData.viewCount);
  const userUid = props.targetWholeData.uid;

  //레시피 데이터 불러오기
  useEffect(() => {
    getRecipeData(props.targetWholeData);
  }, []);

  // 계정 정보 가져오기
  useEffect(() => {
    onSnapshot(doc(dbService, "user", userUid), (snapshot) => {
      setUserData(snapshot.data());
    });
  }, []);
  //조회수
  useEffect(() => {
    setViews((views += 1));
    updateDoc(doc(dbService, "recipe", props.postId), {
      viewCount: views,
    });
  }, []);

  return (
    <>
      <img src={recipeData.thumbnail} alt="thumbnail" />
      <div>음식제목 : {recipeData.foodTitle}</div>
      <div>닉네임 : {userData?.displayName}</div>
      <Bookmark postId={props.postId} recipeData={recipeData} />
      <div>조회수 : {views}</div>
      <div>좋아요 : {recipeData.bookmarkCount}</div>
      <div>재료 : {recipeData.ingredient}</div>
      <div>영화 : {recipeData.animationTitle}</div>
      <div>카테고리 : {recipeData.foodCategory}</div>
      <div>요리시간 : {recipeData.cookingTime}</div>
      <div dangerouslySetInnerHTML={{ __html: recipeData.content }} />
    </>
  );
}
//export default DetailReciptPage;

export const getServerSideProps: any = async (context: any) => {
  let targetWholeData;
  const { params } = context;
  const { id } = params;
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
