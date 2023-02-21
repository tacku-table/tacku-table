import { Tab } from "@headlessui/react";
import { authService, dbService } from "@/config/firebase";

import {
  collection,
  docs,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
// interface MyTabsProps {
//   userInfo: any;
//   setUserInfo: any;
// }
const MyTabs = ({ userInfo, setUserInfo }) => {
  const [recipePost, setRecipePost] = useState([]);
  const [communityPost, setCommunityPost] = useState([]);
  const [commentPost, setCommentPost] = useState([]);
  const [bookmarkPost, setBookmarkPost] = useState([]);
  const userId = userInfo.userId;
  // const currentUser = JSON.parse(sessionStorage.getItem("User")) || "";

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  let [categories] = useState([
    "즐겨찾기",
    "내가 쓴 레시피",
    "내가 쓴 커뮤니티글",
    "내가 쓴 커뮤니티 댓글",
  ]);
  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("User")) || "";
    getMyCommunityPost(userId);
    getMyRecipePost(userId);
    getCommunityComment(userId);
    getMyBookmark(userId);
  });
  // 즐겨찾기
  // user 컬렉션 -> userInfo.id 일치 doc ->
  // bookmarkPost 컬렉션 통째로 가져오기
  // 하위문서로 접근 recipeid
  const getMyBookmark = async (userId) => {
    // const userRef = collection(dbService, `user/${userId}/bookmarkPost`);
    const q = query(collection(dbService, `user/${userId}/bookmarkPost`));
    onSnapshot(q, (snapshot) => {
      const myposts = snapshot.docs.map((doc) => {
        const mypost = {
          postId: doc.id,
          ...doc.data(),
        };
        return mypost;
      });
      setBookmarkPost(myposts);
    });
  };
  // 내가 쓴 레시피
  const getMyRecipePost = async (userId) => {
    const recipeRef = collection(dbService, "recipe");
    const q = query(recipeRef, where("uid", "==", `${userId}`));
    onSnapshot(q, (snapshot) => {
      const myposts = snapshot.docs.map((doc) => {
        const mypost = {
          postId: doc.id,
          ...doc.data(),
        };
        // console.log(doc.id, " => ", doc.data());
        return mypost;
      });
      setRecipePost(myposts);
    });
  };

  // 커뮤니티 게시글
  const getMyCommunityPost = async (userId) => {
    const communityRef = collection(dbService, "communityPost");
    const q = query(communityRef, where("uid", "==", `${userId}`));
    onSnapshot(q, (snapshot) => {
      const myposts = snapshot.docs.map((doc) => {
        const mypost = {
          postId: doc.id,
          ...doc.data(),
        };
        // console.log(doc.id, " => ", doc.data());
        return mypost;
      });
      setCommunityPost(myposts);
    });
  };

  // 커뮤니티 댓글
  const getCommunityComment = async (userId) => {
    const commentsRef = collection(dbService, "comments");
    const q = query(commentsRef, where("uid", "==", `${userId}`));
    onSnapshot(q, (snapshot) => {
      const myposts = snapshot.docs.map((doc) => {
        const mypost = {
          postId: doc.id,
          boardId: doc.data().boardId,
          comment: doc.data().comment,
        };
        // console.log(doc.id, " => ", doc.data());
        return mypost;
      });
      setCommentPost(myposts);
    });
  };

  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1  bg-white">
        {categories.map((category) => (
          <Tab
            key={category}
            className={({ selected }) =>
              classNames(
                "w-full  py-2.5 text-[18px] font-medium leading-5 text-mono100 border-2 border-white",
                "ring-white ring-opacity-60 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white  border-b-brand100 border-b-2 font-bold"
                  : " hover:bg-white/[0.12]"
              )
            }
          >
            {category}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="w-[880px] h-[501px] mt-8 bg-purple-200 m-auto">
        <Tab.Panel>
          {bookmarkPost?.map((p) => (
            <div key={p.postId}>
              <div className="pl-8 pt-[91px] flex space-x-[20px] items-center">
                <Image
                  className="object-cover aspect-[4/3]" //aspect-ratio 수정
                  src={p.thumbnail}
                  priority={true}
                  loader={({ src }) => src}
                  width={180}
                  height={105}
                  alt="bookmark-thumbnail"
                />
                <Link legacyBehavior href={`/detailRecipePage/${p.postId}`}>
                  <a className="text-[24px]">{p.foodTitle}</a>
                </Link>
                <p>{p.viewCount}</p>
              </div>
              <p className="text-[16px]">{p.writerNickName}</p>
            </div>
          ))}
        </Tab.Panel>
        <Tab.Panel>
          {recipePost?.map((p) => (
            <div key={p.postId}>
              <Link legacyBehavior href={`/detailRecipePage/${p.postId}`}>
                <a>{p.foodTitle}</a>
              </Link>
            </div>
          ))}
        </Tab.Panel>
        <Tab.Panel>
          {communityPost?.map((p) => (
            <div key={p.postId}>
              <Link legacyBehavior href={`/communityPage/${p.postId}`}>
                <a>{p.title}</a>
              </Link>
            </div>
          ))}
        </Tab.Panel>
        <Tab.Panel>
          {commentPost?.map((p) => (
            <div key={p.postId}>
              <Link legacyBehavior href={`/communityPage/${p.boardId}`}>
                <a>{p.comment}</a>
              </Link>
            </div>
          ))}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default MyTabs;
