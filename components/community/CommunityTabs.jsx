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
import defaultImg from "../../public/images/test1.png";
import Pagination from "./Pagination";
import RecipeTab from "./RecipeTab";
import AnimeTab from "./AnimeTab";
import GossipTab from "./GossipTab";
const CommunityTabs = () => {
  // 전체글 state
  const [communityList, setCommunityList] = useState([]);
  // 페이지네이션 limit, page, offset
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1); //default=현재 페이지번호
  const offset = (page - 1) * limit;
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
  // let [categories] = useState({
  //   전체글목록: communityList,
  //   요리게시판: foodPost,
  //   애니게시판: animePost,
  //   잡담게시판: gossipPost,
  // });

  useEffect(() => {
    getCommunityList();
  }, [communityList]);

  const getCommunityList = () => {
    const communityRef = collection(dbService, "communityPost");
    const q = query(communityRef, orderBy("writtenDate", "desc"));
    onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => {
        let nickname;
        getUserInfoInUserCollection(doc.data().uid)
          .then((nick) => {
            nickname = nick.userNickname;
            // console.log(nickname);
            return { nickname };
          })
          .then((res) => {});
        const newPost = {
          id: doc.id,
          category: doc.data().category,
          title: doc.data().title,
          editorText: doc.data().editorText,
          writtenDate: convertTimestamp(doc.data().writtenDate),
          thumbnail: doc.data().thumbnail,
          // nickname: doc.data().nickname
          nickname: nickname,
        };
        return newPost;
      });
      setCommunityList(newPosts);
      //   console.log(communityList);
    });
  };

  const getUserInfoInUserCollection = async (uid) => {
    const docRef = doc(dbService, "user", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const userInfo = {
        userNickname: userData.userNickname,
      };
      return userInfo;
    } else {
      console.log("No such document!");
    }
    return userInfo;
  };

  return (
    <div className="w-[860px]">
      <Tab.Group>
        <Tab.List className="flex w-[780px] rounded-sm p-1 mx-auto my-6">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  " w-full h-[55px] py-2.5 text-sm font-medium leading-5 border-y border-l border-mono50 last:border-r",
                  "ring-white focus:outline-none",
                  selected ? " text-brand100" : "text-mono100"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <h4 className="w-full text-2xl font-bold pb-4 border-b-2 border-brand100">
          커뮤니티 글쓰기
        </h4>
        <Tab.Panels>
          <Tab.Panel>
            {communityList?.slice(offset, offset + limit).map((p) => (
              <div
                key={p.id}
                className="border-b border-mono60 py-4 px-5 flex text-sm"
              >
                {p.thumbnail === "" ? (
                  <Image
                    className="object-cover aspect-[4/3]" //aspect-ratio 수정
                    src={defaultImg}
                    priority={true}
                    // loader={({ src }) => src}
                    width={70}
                    height={41}
                    alt="community-thumbnail-default"
                  />
                ) : (
                  <Image
                    className="object-cover aspect-[4/3]" //aspect-ratio 수정
                    src={p.thumbnail}
                    priority={true}
                    loader={({ src }) => src}
                    width={70}
                    height={41}
                    alt="community-thumbnail"
                  />
                )}
                <div className="pl-5">
                  <Link legacyBehavior href={`/communityPage/${p.id}`}>
                    <a>{p.title}</a>
                  </Link>
                  <div className="flex mt-3 text-mono70">
                    <div className="border-r border-mono60 pr-3">
                      {p.category}
                    </div>
                    <div className="border-r border-mono60 px-3">
                      {p.writtenDate}
                    </div>
                    <div className="pl-3">{p.nickname}</div>
                  </div>
                </div>
              </div>
            ))}
            <Pagination
              total={communityList.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </Tab.Panel>
          <RecipeTab communityList={communityList} categories={categories} />

          <AnimeTab communityList={communityList} categories={categories} />
          <GossipTab communityList={communityList} categories={categories} />
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default CommunityTabs;
