import { useEffect, useState } from "react";
import {
  onSnapshot,
  query,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { authService, dbService } from "@/config/firebase";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";

const useToggleLike = (recipePost: any) => {
  const [liked, setLiked] = useState(false);
  const currentUser = useSelector((state: any) => state.currentUser);
  console.log(currentUser);
  const toggleLike = async () => {
    if (recipePost.like?.includes(currentUser.email)) {
      setLiked(false);
      const copy = [...recipePost.like];
      const filter = copy.filter((email) => email !== currentUser.email);
      await updateDoc(doc(dbService, "recipePost", recipePost.id), {
        like: filter,
      });
      // if (Object.keys(nweetObj).includes("parent") === false) { // 키 존재 여부 확인하는 다른 방법
    } else {
      setLiked(true);
      const copy = [...recipePost.like];
      copy.push(currentUser.email);
      await updateDoc(doc(dbService, "recipePost", recipePost.id), {
        like: copy,
      });
    }
  };

  return { liked, setLiked, toggleLike };
};

export default useToggleLike;
