import { Tab } from "@headlessui/react";
import { authService, dbService } from "@/config/firebase";
import { convertTimestamp } from "../../util";
import {
  collection,
  doc,
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
import { getDownloadURL, listAll, ref } from "firebase/storage";
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
    // getWriterProfileImg();
  });
  // 즐겨찾기
  // user 컬렉션 -> userInfo.id 일치 doc ->
  // bookmarkPost 컬렉션 통째로 가져오기
  // 하위문서로 접근 recipeid
  // 레시피 uid === user 컬렉션 doc.id
  const getMyBookmark = async (userId) => {
    const q = query(collection(dbService, `user/${userId}/bookmarkPost`));
    onSnapshot(q, (snapshot) => {
      const myposts = snapshot.docs.map((doc) => {
        const mypost = {
          postId: doc.id,
          writerUid: doc.data().uid,
          ...doc.data(),
        };
        return mypost;
      });
      setBookmarkPost(myposts);
    });
  };
  const getWriterProfileImg = async () => {
    // if (userInfo?.userImg === "null") return;
    const imageListRef = ref(storage, "profileImage/");
    await listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          // url === writeruid
          if (url === userInfo?.userImg) {
            setShowUserUpdateImg(url);
          }
        });
      });
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
        // console.log(doc.data().writtenDate);
        const mypost = {
          postId: doc.id,
          writtenDate: convertTimestamp(doc.data().writtenDate),
          category: doc.data().category,
          title: doc.data().title,
        };
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
        return mypost;
      });
      setCommentPost(myposts);
    });
  };

  return (
    <Tab.Group>
      <Tab.List className="flex space-x-16 ml-[370px] bg-white">
        {categories.map((category) => (
          <Tab
            key={category}
            className={({ selected }) =>
              classNames(
                "w-fit pt-7 pb-[15px] text-[18px] font-medium leading-5 text-mono100 border-[3px] border-x-0  border-white",
                "ring-white ring-opacity-60 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white  border-b-brand100  border-b-[3px] font-bold"
                  : " hover:bg-white/[0.12]"
              )
            }
          >
            {category}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="w-[880px] h-full min-h-[501px] mt-8 mb-[100px] shadow-xl m-auto ">
        <Tab.Panel className="pt-[91px] pb-6">
          {bookmarkPost?.map((p) => (
            <div key={p.postId} className="px-6 mb-5">
              <hr className="border-border mx-8 mb-6 border-[1px]" />
              <div className="pl-8 space-x-[20px] items-center flex">
                <Image
                  className="object-cover aspect-[4/3]" //aspect-ratio 수정
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
              <div className="flex mt-9 ml-8 space-x-3">
                <div className="w-7 h-7 bg-slate-500 aspect-square" />
                <p className="text-[16px]">{p.writerNickName}</p>
              </div>
            </div>
          ))}
        </Tab.Panel>
        <Tab.Panel>
          {recipePost?.map((p) => (
            <div key={p.postId} className="px-6 mb-5">
              <hr className="border-border mx-8 mb-6 border-[1px]" />
              <div className="pl-8 space-x-[20px] items-center flex">
                <Image
                  className="object-cover aspect-[4/3]" //aspect-ratio 수정
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
              {/* <div className="flex mt-9 ml-8 space-x-3">
                <div className="w-7 h-7 bg-slate-500 aspect-square" />
                <p className="text-[16px]">{p.writerNickName}</p>
              </div> */}
            </div>
          ))}
        </Tab.Panel>
        <Tab.Panel>
          {communityPost?.map((p) => (
            <div key={p.postId} className="px-6 mb-5">
              <hr className="border-border mx-8 mb-6 border-[1px]" />
              <div className="pl-8 space-x-[20px] items-center flex">
                <div className="flex flex-col">
                  <span>{p.writtenDate}</span>
                  <Link legacyBehavior href={`/communityPage/${p.postId}`}>
                    <a>{p.title}</a>
                  </Link>
                </div>
              </div>
              <div className="flex mt-9 ml-8 space-x-3">
                <p className="text-[16px]">{p.writerNickName}</p>
              </div>
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
