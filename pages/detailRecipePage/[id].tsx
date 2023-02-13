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
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { authService, dbService } from "@/config/firebase";
import { useRouter } from "next/router";
import Link from "next/link";

const DetailReciptPage = () => {
  const [recipeData, getRecipeData] = useState<any>("");
  const authService = getAuth();
  const uid = authService.currentUser?.uid;
  const displayName = authService.currentUser?.displayName;
  const photoURL = authService.currentUser?.photoURL;
  const router = useRouter();
  const { id }: any = router.query;

  const getrecipePost: any = async () => {
    const snapshot = await getDoc(doc(dbService, "recipePost", id));
    const data = snapshot.data(); // 가져온 doc의 객체 내용
    getRecipeData(data);
  };
  useEffect(() => {
    getrecipePost();
  }, []);

  return (
    <>
      <div>{recipeData.foodTitle}</div>
      <div>{displayName}</div>
      <div>{photoURL}</div>
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
