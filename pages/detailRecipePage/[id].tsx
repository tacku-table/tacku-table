import { useEffect, useState } from "react";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { authService, dbService } from "@/config/firebase";
import { useRouter } from "next/router";
import Bookmark from "@/components/bookmark/Bookmark";

const DetailReciptPage = () => {
  //레시피 데이터
  const [recipeData, getRecipeData] = useState<any>("");
  const [userData, setUserData] = useState<any>("");
  const router = useRouter();
  //해당 레시피 id 파람
  const { id }: any = router.query;
  //레시피 데이터 불러오기
  useEffect(
    () =>
      onSnapshot(doc(dbService, "recipe", id), (snapshot) => {
        getRecipeData(snapshot.data());
      }),

    [dbService]
  );
  // 계정 정보 가져오기
  useEffect(() => {
    onSnapshot(doc(dbService, "user", recipeData.uid), (doc) => {
      setUserData(doc.data());
    });
  }, []);
  return (
    <>
      <img src={recipeData.thumbnail} alt="thumbnail" />
      <div>음식제목 : {recipeData.foodTitle}</div>
      <div>닉네임 : {userData.displayName}</div>
      <Bookmark id={id} recipeData={recipeData} />
      <div>조회수 : {recipeData.viewCounting}</div>
      <div>좋아요 : {recipeData.bookmarkCount}</div>
      <div>재료 : {recipeData.ingredient}</div>
      <div>영화 : {recipeData.animationTitle}</div>
      <div>카테고리 : {recipeData.foodCategory}</div>
      <div>요리시간 : {recipeData.cookingTime}</div>
      <div dangerouslySetInnerHTML={{ __html: recipeData.content }} />
    </>
  );
};

export default DetailReciptPage;
