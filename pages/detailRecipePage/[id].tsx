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
import { useSession } from "next-auth/react";
import Like from "@/components/bookmark/Like";

const DetailReciptPage = () => {
  //레시피 데이터
  const [recipeData, getRecipeData] = useState<any>("");
  const [creatorInfo, setCreatorInfo] = useState<any>("");
  const router = useRouter();
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

  return (
    <>
      <div>{recipeData.foodTitle}</div>
      <div>{recipeData.displayName}</div>
      <Like id={id} recipeData={recipeData} />
      <div>{recipeData.thumbnail}</div>
      <div>{recipeData.viewCounting}</div>
      <div>{recipeData.ingredient}</div>
      <div>{recipeData.animationTitle}</div>
      <div>{recipeData.foodCategory}</div>
      <div>{recipeData.cookingTime}</div>
      <div>{recipeData.content}</div>
    </>
  );
};

export default DetailReciptPage;
