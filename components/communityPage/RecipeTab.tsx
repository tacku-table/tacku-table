import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import Pagination from "./Pagination";
import useGetCommunityPost from "@/hooks/useGetCommunityPost";
import Post from "./Post";

const RecipeTab = ({ categories }: any) => {
  const [foodPost, setFoodPost] = useState<TCommunity[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const { communityPost } = useGetCommunityPost();
  useEffect(() => {
    getFoodCommunityPost(communityPost, categories);
  }, [communityPost]);

  const getFoodCommunityPost = async (
    communityPost: TCommunity[],
    categories: string[]
  ) => {
    let foodArr = communityPost;
    const newArr = foodArr.filter((item: { category: string }) =>
      item.category.includes(categories[1].slice(0, 2))
    );
    setFoodPost(newArr);
  };

  return (
    <Tab.Panel>
      {foodPost?.slice(offset, offset + limit).map((post) => (
        <Post post={post} key={post.id} />
      ))}
      <Pagination
        total={foodPost.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </Tab.Panel>
  );
};

export default RecipeTab;
