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
import defaultImg from "../../public/images/profile.jpeg";
import Image from "next/image";

const CommunityTabs = () => {
  // 전체글 state
  const [communityList, setCommunityList] = useState([]);
  const [foodPost, setFoodPost] = useState([]);
  const [animePost, setAnimePost] = useState([]);
  const [gossipPost, setGassipPost] = useState([]);

  //   class css 함수
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  //   탭바 변경 state
  let [categories] = useState(["전체 글목록", "요리", "애니", "잡담"]);
  const convertTimestamp = (writtenDate) => {
    let date = writtenDate.toDate();
    let hours = date.getHours();
    let minutes = date.getMinutes() < 10 ? "0" : "";
    minutes = minutes + date.getMinutes();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let yyyy = date.getFullYear();
    // return (date = `${yyyy}-${mm}-${dd} ${hours}:${minutes}`);
    return (date = `${yyyy}.${mm}.${dd} ${hours}:${minutes}`);
  };

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
          nickname: doc.data().nickname,
          editorText: doc.data().editorText,
          thumbnail: doc.data().thumbnail,
          writtenDate: convertTimestamp(doc.data().writtenDate),
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
    const newArr = foodArr.filter((item) => item.category == categories[1]);
    setFoodPost(newArr);
  };
  //   애니
  const getAnimeCommunityPost = async (communityList, categories) => {
    let animeArr = communityList;
    const newArr = animeArr.filter((item) => item.category == categories[2]);
    setAnimePost(newArr);
  };
  // 잡담
  const getGossipCommunityPost = async (communityList, categories) => {
    // let gossipArr = communityList;
    const newArr = communityList.filter(
      (item) => item.category == categories[3]
    );
    setGassipPost(newArr);
    // setTimeout(() => console.log(gossipPost), 1000);
  };
  return (
    <div>
      <Tab.Group>
        <Tab.List className="flex w-[860px] rounded-sm p-1">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  " w-full py-2.5 text-sm font-medium leading-5 text-white border border-mono60",
                  "ring-white focus:outline-none",
                  selected ? " text-orange-400" : "text-slate-200"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <h4 className="w-full text-4xl font-bold pb-6 border-b-2 border-brand100">
          커뮤니티 글쓰기
        </h4>
        <Tab.Panels>
          <Tab.Panel>
            {communityList?.map((p) => (
              <div key={p.id} className="border-b border-mono60">
                {/* <div>글아이디:{post.id}</div> */}
                <Link legacyBehavior href={`/communityPage/${p.id}`}>
                  <a className="bg-orange-300">{p.title}</a>
                </Link>
                <div className="flex">
                  <div className="border-r border-mono60"> {p.category}</div>
                  <div className="border-r border-mono60">{p.writtenDate}</div>
                  <div className="border-r border-mono60">{p.nickname}</div>
                </div>
              </div>
            ))}
          </Tab.Panel>
          <Tab.Panel>
            {foodPost.map((p) => (
              <div key={p.id} className="border-b border-mono60">
                <Link legacyBehavior href={`/communityPage/${p.id}`}>
                  <a className="bg-orange-300">{p.title}</a>
                </Link>
                <div className="flex">
                  <div className="border-r border-mono60"> {p.category}</div>
                  <div className="border-r border-mono60">{p.writtenDate}</div>
                  <div className="border-r border-mono60">{p.nickname}</div>
                </div>
              </div>
            ))}
          </Tab.Panel>
          <Tab.Panel>
            {animePost.map((p) => (
              <div key={p.id} className="border-b border-mono60">
                <Link legacyBehavior href={`/communityPage/${p.id}`}>
                  <a className="bg-orange-300">{p.title}</a>
                </Link>
                <div className="flex">
                  <div className="border-r border-mono60"> {p.category}</div>
                  <div className="border-r border-mono60">{p.writtenDate}</div>
                  <div className="border-r border-mono60">{p.nickname}</div>
                </div>
              </div>
            ))}
          </Tab.Panel>
          <Tab.Panel>
            {gossipPost.map((p) => (
              <div key={p.id} className="border-b border-mono60">
                <Link legacyBehavior href={`/communityPage/${p.id}`}>
                  <a className="bg-orange-300">{p.title}</a>
                </Link>
                <div className="flex">
                  <div className="border-r border-mono60"> {p.category}</div>
                  <div className="border-r border-mono60">{p.writtenDate}</div>
                  <div className="border-r border-mono60">{p.nickname}</div>
                </div>
              </div>
            ))}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default CommunityTabs;
