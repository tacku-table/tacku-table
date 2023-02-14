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

const DetailReciptPage = () => {
  const [recipeData, getRecipeData] = useState<any>("");
  const [creatorInfo, setCreatorInfo] = useState<any>("");
  const { data: session } = useSession();
  const uid = authService.currentUser?.uid;
  const [likes, setLikes] = useState<any[]>([]);
  const [hasLikes, setHasLikes] = useState(false);
  const router = useRouter();
  const { id }: any = router.query;

  const getrecipePost: any = async () => {
    const snapshot = await getDoc(doc(dbService, "recipePost", id));
    const data = snapshot.data(); // 가져온 doc의 객체 내용
    getRecipeData(data);
  };
  const likePost = async () => {
    try {
      if (hasLikes) {
        await deleteDoc(doc(dbService, "user", id, "likes", id));
      } else {
        console.log(dbService);
        await setDoc(doc(dbService, "user", id, "likes"), {
          post: id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getrecipePost();
  }, []);

  useEffect(
    () =>
      onSnapshot(collection(dbService, "user", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [dbService, id]
  );
  // useEffect(
  //   () => setHasLikes(likes.findIndex((like) => like.id === uid) !== -1),

  //   [likes]
  // );
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
      <button onClick={likePost}>북마크</button>
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
