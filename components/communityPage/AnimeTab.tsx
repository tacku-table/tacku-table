import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import Pagination from "./Pagination";
import useGetCommunityPost from "@/hooks/useGetCommunityPost";
import Post from "./Post";

const AnimeTab = ({ categories }: any) => {
  const [animePost, setAnimePost] = useState<Community[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1); //default=현재 페이지번호
  const offset = (page - 1) * limit;

  const { communityPost } = useGetCommunityPost();
  useEffect(() => {
    getAnimeCommunityPost(communityPost, categories);
  }, [communityPost]);

  const getAnimeCommunityPost = async (
    communityList: Community[],
    categories: string[]
  ) => {
    let animeArr = communityList;
    const newArr = animeArr.filter((item: { category: string }) =>
      item.category.includes(categories[2].slice(0, 2))
    );
    setAnimePost(newArr);
  };
  return (
    <Tab.Panel>
      {animePost?.slice(offset, offset + limit).map((post) => (
        <Post post={post} key={post.id} />
      ))}
      <Pagination
        total={animePost.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </Tab.Panel>
  );
};

export default AnimeTab;
