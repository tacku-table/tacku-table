import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import EmptyPost from "./EmptyPost";
import useGetRecipePost from "@/hooks/useGetRecipePost";

const RecipeTab = ({ userInfo }: MyTabProp) => {
  const [recipeList, setRecipeList] = useState<any[]>([]);

  const { recipePost } = useGetRecipePost();

  useEffect(() => {
    setRecipeList(() => {
      return recipePost.filter((p) => p?.uid === userInfo?.userId);
    });
  }, [recipePost]);

  return (
    <Tab.Panel className="pb-6 w-full h-[80%]">
      {recipeList.length === 0 && <EmptyPost />}
      {recipeList?.map((p) => (
        <div key={p.postId} className="pt-6 px-1 sm:p-6">
          <hr className="border-mono50 mx-8 my-6 border-[1px]" />
          <div className="space-x-4 sm:space-x-[20px] items-center flex">
            <Link legacyBehavior href={`/detailRecipe/${p.postId}`}>
              <Image
                className="w-[180px] h-[135px] object-cover aspect-[4/3] cursor-pointer rounded-md"
                src={p.thumbnail}
                priority={true}
                loader={({ src }) => src}
                width={180}
                height={135}
                alt="bookmark-thumbnail"
              />
            </Link>
            <div className="flex flex-col">
              <div className="flex space-x-1 w-full text-xs sm:text-base text-mono100">
                <span>#{p.animationTitle}</span>
                <span>#{p.cookingTime}</span>
              </div>
              <Link legacyBehavior href={`/detailRecipe/${p.postId}`}>
                <a className="text-lg sm:text-[24px] font-semibold">
                  {p.foodTitle}
                </a>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </Tab.Panel>
  );
};

export default RecipeTab;
