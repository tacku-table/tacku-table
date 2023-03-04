import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { dbService } from "@/config/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";

const RecipeTab = ({ userInfo }: any) => {
  const [recipePost, setRecipePost] = useState<any[]>([]);

  useEffect(() => {
    getMyRecipePost(userInfo.userId);
  }, [recipePost]);

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }

  // 내가 쓴 레시피
  const getMyRecipePost = async (userId: any) => {
    const recipeRef = collection(dbService, "recipe");
    const q = query(
      recipeRef,
      where("uid", "==", `${userId}`),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const myposts = snapshot.docs.map((doc) => {
        const mypost = {
          postId: doc.id,
          ...doc.data(),
        };
        return mypost;
      });
      setRecipePost(myposts);
    });
  };

  return (
    <Tab.Panel>
      {recipePost?.map((p) => (
        <div key={p.postId} className="px-6 mb-5">
          <hr className="border-mono50 mx-8 mb-6 border-[1px]" />
          <div className="pl-8 space-x-[20px] items-center flex">
            <Image
              className="object-cover aspect-[4/3]"
              src={p.thumbnail}
              priority={true}
              loader={({ src }) => src}
              width={180}
              height={105}
              alt="bookmark-thumbnail"
            />
            <div className="flex flex-col">
              <div className="flex space-x-1">
                <span>#{p.animationTitle}</span>
                <span>#{p.cookingTime}</span>
              </div>
              <Link legacyBehavior href={`/detailRecipePage/${p.postId}`}>
                <a className="text-[24px]">{p.foodTitle}</a>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </Tab.Panel>
  );
};

export default RecipeTab;
