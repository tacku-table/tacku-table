import type { NextPage } from "next";
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
} from "firebase/firestore";
import { dbService } from "@/config/firebase";
import Link from "next/link";

const BestRecipe: NextPage = () => {
  const [recipePost, setRecipePost]: any = useState([]);
  useEffect(() => {
    // const getList = async () => {
    const q = query(collection(dbService, "recipePost"));

    onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipePost(newPosts);
    });
  }, []);
  return (
    <>
      {recipePost?.map((post: any) => (
        <div
          key={post.id}
          className="space-x-7 flex justify-center items-center"
        >
          <Link href={`/detailRecipePage/${post.id}`}>
            <div className="space-y-2">
              <div className="bg-slate-100 w-72 h-56">요리사진</div>
              <div className="text-sm text-slate-500 space-x-2">
                <span>#천공의 성 라퓨타</span>
                <span>#15분이하</span>
                <span>#초간단</span>
              </div>
              <p className="text-lg text-slate-900 font-semibold">
                {post.foodTitle}
              </p>
            </div>
          </Link>
          {/* <div className="space-y-2">
              <div className="bg-slate-100 w-72 h-56">요리사진</div>
              <div className="text-sm text-slate-500 space-x-2">
                <span>#천공의 성 라퓨타</span>
                <span>#15분이하</span>
                <span>#초간단</span>
              </div>
              <p className="text-lg text-slate-900 font-semibold">
                라퓨타 토스트
              </p>
            </div>
            <div className="space-y-2">
              <div className="bg-slate-100 w-72 h-56">요리사진</div>
              <div className="text-sm text-slate-500 space-x-2">
                <span>#천공의 성 라퓨타</span>
                <span>#15분이하</span>
                <span>#초간단</span>
              </div>
              <p className="text-lg text-slate-900 font-semibold">
                라퓨타 토스트
              </p>
            </div> */}
        </div>
      ))}
    </>
  );
};

export default BestRecipe;
