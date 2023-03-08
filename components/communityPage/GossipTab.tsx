import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import Pagination from "./Pagination";
import useGetCommunityPost from "@/hooks/useGetCommunityPost";
import Post from "./Post";

const GossipTab = ({ categories }: any) => {
  const [gossipPost, setGossipPost] = useState<TCommunity[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const { communityPost } = useGetCommunityPost();
  useEffect(() => {
    getGossipCommunityPost(communityPost, categories);
  }, [communityPost]);
  const getGossipCommunityPost = async (
    communityList: TCommunity[],
    categories: string[]
  ) => {
    let animeArr = communityList;
    const newArr = animeArr.filter((item: { category: string }) =>
      item.category.includes(categories[3].slice(0, 2))
    );
    setGossipPost(newArr);
  };
  return (
    <Tab.Panel>
      {gossipPost?.slice(offset, offset + limit).map((post) => (
        <Post post={post} key={post.id} />
      ))}
      <Pagination
        total={gossipPost.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </Tab.Panel>
  );
};

export default GossipTab;
