import { useEffect, useState } from "react";
import {
  onSnapshot,
  query,
  collection,
  doc,
  orderBy,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { authService, dbService } from "@/config/firebase";
import { useRouter } from "next/router";
import Bookmark from "@/components/bookmark/Bookmark";

const DetailReciptPage = () => {
  //레시피 데이터
  const [recipeData, getRecipeData] = useState<any>("");
  const [userData, setUserData] = useState<any>("");
  const router = useRouter();
  const [visits, setVisits] = useState(recipeData.viewCounting);
  //해당 레시피 id 파람
  const { id }: any = router.query;
  //레시피 데이터 불러오기
  useEffect(
    () =>
      onSnapshot(doc(dbService, "recipePost", id), (snapshot) => {
        getRecipeData(snapshot.data());
      }),
    [dbService]
  );
  // 계정 정보 가져오기
  useEffect(() => {
    onSnapshot(doc(dbService, "user", id), (doc) => {
      setUserData(doc.data());
    });
  }, [id]);
  //조회수

  return (
    <>
      <div>{recipeData.foodTitle}</div>
      <div>{recipeData.displayName}</div>
      <Bookmark id={id} recipeData={recipeData} />
      <div>{recipeData.thumbnail}</div>
      <div>조회수 : {recipeData.viewCounting}</div>
      <div>좋아요 : {recipeData.likecount}</div>
      <div>{recipeData.ingredient}</div>
      <div>{recipeData.animationTitle}</div>
      <div>{recipeData.foodCategory}</div>
      <div>{recipeData.cookingTime}</div>
      <div>{recipeData.content}</div>
    </>
  );
};

export default DetailReciptPage;
