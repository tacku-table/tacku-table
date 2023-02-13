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
import useToggleLike from "./like";

const DetailReciptPage = () => {
  const [recipeData, getRecipeData] = useState<any>("");
  const [creatorInfo, setCreatorInfo] = useState<any>("");
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

  // useEffect(() => {
  //   const q = query(collection(dbService, "recipePost"));
  //   onSnapshot(q, (querySnapShot) => {
  //     const userArray = querySnapShot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     getRecipeData(userArray);
  //     console.log("userArray", userArray);
  //   });
  // }, [uid]);

  // useEffect(() => {
  //   onSnapshot(doc(dbService, "user"), (doc) => {
  //     setCreatorInfo(doc.data());
  //   });
  // }, []);

  return (
    <>
      <div>{recipeData.foodTitle}</div>
      <div>{recipeData.displayName}</div>
      <button onClick={useToggleLike}>북마크</button>
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
