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

export interface PostType {
  uid: string; // auth.currentUser에 있는 id
  animationTitle: string;
  foodTitle: string;
  ingredient: string;
  cookingTime: string;
  foodCategory: string;
  displayStatus: boolean;
  thumbnail: string;
  createdAt: string;
  content: string;
  viewCounting: number;
  bookmarkCount: number;
}

const BestRecipe: NextPage = () => {
  const [recipePost, setRecipePost]: any = useState([]);
  useEffect(() => {
    // const getList = async () => {
    const q = query(collection(dbService, "recipe"));

    onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipePost(newPosts);
    });
  }, []);
  console.log(recipePost);
  return (
    <>
      {recipePost?.map((post: any) => (
        <div
          key={post.id}
          className="space-x-7 flex justify-center items-center"
        >
          <Link key={post.id} href={`/detailRecipePage/${post.id}`}>
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
            </div>
          </Link>
        </div>
      ))}
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
                </div>
            </div> */}
    </>
  );
};

export default BestRecipe;
