import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import {
  onSnapshot,
  query,
  collection,
  orderBy,
  getDoc,
  doc,
} from "firebase/firestore";
import Link from "next/link";
import { authService, dbService } from "../../config/firebase";
import { convertTimestamp } from "../../util";
import Image from "next/image";
const CommunityTabs = () => {
  // 전체글 state
  const [communityList, setCommunityList] = useState([]);
  const [foodPost, setFoodPost] = useState([]);
  const [animePost, setAnimePost] = useState([]);
  const [gossipPost, setGossipPost] = useState([]);

  //   class css 함수
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  //   탭바 변경 state
  let [categories] = useState([
    "전체 글목록",
    "요리게시판",
    "애니게시판",
    "잡담게시판",
  ]);

  useEffect(() => {
    getCommunityList();
  }, [communityList]);

  const getCommunityList = () => {
    const communityRef = collection(dbService, "communityPost");
    const q = query(communityRef, orderBy("writtenDate", "desc"));
    onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => {
        const newPost = {
          id: doc.id,
          category: doc.data().category,
          title: doc.data().title,
          editorText: doc.data().editorText,
          writtenDate: convertTimestamp(doc.data().writtenDate),
          thumbnail: doc.data().thumbnail,
        };
        return newPost;
      });
      setCommunityList(newPosts);
      //   console.log(communityList);
    });
    getFoodCommunityPost(communityList, categories);
    getAnimeCommunityPost(communityList, categories);
    getGossipCommunityPost(communityList, categories);
  };
  // 요리 cate
  const getFoodCommunityPost = async (communityList, categories) => {
    let foodArr = communityList;
    const newArr = foodArr.filter((item) =>
      item.category.includes(categories[1].slice(0, 2))
    );
    setFoodPost(newArr);
  };
  // 애니
  const getAnimeCommunityPost = async (communityList, categories) => {
    let animeArr = communityList;
    // slice??
    const newArr = animeArr.filter((item) =>
      item.category.includes(categories[2].slice(0, 2))
    );
    setAnimePost(newArr);
  };
  // 잡담
  const getGossipCommunityPost = async (communityList, categories) => {
    // let gossipArr = communityList;
    const newArr = communityList.filter((item) =>
      item.category.includes(categories[3].slice(0, 2))
    );
    setGossipPost(newArr);
    // setTimeout(() => console.log(gossipPost), 1000);
  };
  return (
    <Tab.Group>
      <Tab.List>
        {categories.map((category) => (
          <Tab
            key={category}
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-orange-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow text-orange-400"
                  : "text-slate-200 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            {category}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          {communityList?.map((p) => (
            <div key={p.id}>
              <div>글 제목: {p.title}</div>
              <Image
                // className="object-cover aspect-[4/3]" //aspect-ratio 수정
                src={p.thumbnail}
                priority={true}
                loader={({ src }) => src}
                width={70}
                height={41}
                alt="community-thumbnail"
              />
              <Link legacyBehavior href={`/communityPage/${p.id}`}>
                <a className="bg-orange-300">{p.title}</a>
              </Link>
              <div>작성일: {p.writtenDate}</div>
            </div>
          ))}
        </Tab.Panel>
        <Tab.Panel>
          {foodPost.map((p) => (
            <div key={p.id}>
              <div>글 제목: {p.title}</div>
              <Image
                className="object-cover aspect-[4/3]" //aspect-ratio 수정
                src={p.thumbnail}
                priority={true}
                loader={({ src }) => src}
                width={70}
                height={41}
                alt="community-thumbnail"
              />
              <div>카테고리: {p.category}</div>
              <Link legacyBehavior href={`/communityPage/${p.id}`}>
                <a className="bg-orange-300">{p.title}</a>
              </Link>
              <div>작성일: {p.writtenDate}</div>
            </div>
          ))}
        </Tab.Panel>
        <Tab.Panel>
          {animePost.map((p) => (
            <div key={p.id}>
              <div>글 제목: {p.title}</div>
              <Image
                className="object-cover aspect-[4/3]" //aspect-ratio 수정
                src={p.thumbnail}
                priority={true}
                loader={({ src }) => src}
                width={70}
                height={41}
                alt="community-thumbnail"
              />
              <div>카테고리: {p.category}</div>
              <Link legacyBehavior href={`/communityPage/${p.id}`}>
                <a className="bg-orange-300">{p.title}</a>
              </Link>
              <div>작성일: {p.writtenDate}</div>
            </div>
          ))}
        </Tab.Panel>
        <Tab.Panel>
          {gossipPost.map((p) => (
            <div key={p.id}>
              <div>글 제목: {p.title}</div>
              <Image
                className="object-cover aspect-[4/3]" //aspect-ratio 수정
                src={p.thumbnail}
                priority={true}
                loader={({ src }) => src}
                width={70}
                height={41}
                alt="community-thumbnail"
              />
              <div>카테고리: {p.category}</div>
              <Link legacyBehavior href={`/communityPage/${p.id}`}>
                <a className="bg-orange-300">{p.title}</a>
              </Link>
              <div>작성일: {p.writtenDate}</div>
            </div>
          ))}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default CommunityTabs;
