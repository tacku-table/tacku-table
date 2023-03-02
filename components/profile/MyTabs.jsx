import { Tab } from "@headlessui/react";
import { authService, dbService } from "@/config/firebase";
import { convertTimestamp } from "../../util";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import defaultImg from "../../public/images/test1.png";
// interface MyTabsProps {
//   userInfo: any;
//   setUserInfo: any;
// }
const MyTabs = ({ userInfo, setUserInfo }) => {
  const [recipePost, setRecipePost] = useState([]);
  const [communityPost, setCommunityPost] = useState([]);
  const [commentPost, setCommentPost] = useState([]);
  const [bookmarkPost, setBookmarkPost] = useState([]);
  const [storageCurrentUser, setStorageCurrentUser] = useState({});
  const [communityList, setCommunityList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //   const getCurrentUserInfo = async (id) => {
  //     await getDoc(doc(dbService, "user", id)).then((doc) => {
  //       // console.log("getCurrentUserInfo의 data: ", doc.data());
  //       const user = {
  //         ...doc.data(),
  //       };
  //       setUserInfo(user);
  //     });
  //   };
  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("User")) || "";
    if (currentUser) {
      setStorageCurrentUser(currentUser);
    } else {
      setStorageCurrentUser("logout");
    }
  }, []);

  // const userId = userInfo.userId;
  useEffect(() => {
    getCommunityList();
    getMyRecipePost(userInfo.userId);
    getMyCommunityPost(userInfo.userId);
    getCommunityComment(userInfo.userId);
    getMyBookmark(userInfo.userId);
  }, [userInfo.userId, bookmarkPost, communityPost, commentPost, recipePost]);

  useEffect(() => {
    setIsLoading(false);
  });

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  let [categoriesOfmine] = useState([
    "즐겨찾기",
    "내가 쓴 레시피",
    "내가 쓴 커뮤니티글",
    "내가 쓴 커뮤니티 댓글",
  ]);
  let [categoriesOfOther] = useState([
    "님의 즐겨찾기",
    "님의 레시피",
    "님의 커뮤니티글",
  ]);

  // console.log(bookmarkPost);
  // 즐겨찾기
  // user 컬렉션 -> userInfo.id 일치 doc ->
  // bookmarkPost 컬렉션 통째로 가져오기
  // 하위문서로 접근 recipeid
  // 레시피 uid === user 컬렉션 doc.id

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
          nickname: doc.data().nickname,
        };
        return newPost;
      });
      setCommunityList(newPosts);
      //   console.log(communityList);
    });
  };

  const getMyBookmark = async (userId) => {
    const q = query(collection(dbService, `user/${userId}/bookmarkPost`));

    onSnapshot(q, async (snapshots) => {
      const myposts = snapshots.docs.map((doc) => {
        const mypost = {
          postId: doc.id,
          writerUid: doc.data().uid,
          writerdisplayName: doc.data().writerNickName,
          writerImg: doc.data().writerProfileImg,
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
    const q = query(
      recipeRef,
      where("uid", "==", `${userId}`),
      orderBy("writtenDate", "desc")
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

  // 커뮤니티 게시글
  const getMyCommunityPost = async (userId) => {
    const communityRef = collection(dbService, "communityPost");
    const q = query(
      communityRef,
      where("uid", "==", `${userId}`),
      orderBy("writtenDate", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const myposts = snapshot.docs.map((doc) => {
        // console.log("postId: ", doc.id);
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
        {storageCurrentUser?.uid === userInfo.userId ? (
          <>
            {categoriesOfmine.map((category) => (
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
          </>
        ) : (
          <>
            {categoriesOfOther.map((category) => (
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
                <span className="mr-1">{userInfo?.userNickname}</span>
                {category}
              </Tab>
            ))}
          </>
        )}
      </Tab.List>
      <Tab.Panels className="w-[880px] h-full min-h-[501px] mt-8 mb-[100px] shadow-xl m-auto ">
        <Tab.Panel className="pt-[91px] pb-6">
          {bookmarkPost?.map((p) => (
            <div key={p.postId} className="px-6 mb-5">
              <hr className="border-mono50 mx-8 mb-6 border-[1px]" />
              <div className="pl-8 space-x-[20px] items-center flex">
                {p.thumbnail && (
                  <Image
                    className="object-cover aspect-[4/3]" //aspect-ratio 수정
                    src={p.thumbnail}
                    priority={true}
                    loader={({ src }) => src}
                    width={180}
                    height={105}
                    alt="bookmark-thumbnail"
                  />
                )}
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
                {p.writerImg === "null" ? (
                  <Image
                    className="aspect-square rounded-md object-cover w-12 h-12"
                    src={defaultImg}
                    priority={true}
                    loader={({ src }) => src}
                    width={12}
                    height={12}
                    alt="글쓴이프로필"
                  />
                ) : (
                  <Image
                    className="aspect-square rounded-md object-cover w-12 h-12"
                    src={p.writerImg}
                    priority={true}
                    loader={({ src }) => src}
                    width={12}
                    height={12}
                    alt="글쓴이프로필"
                  />
                )}
                <p className="text-[16px]">{p.writerdisplayName}</p>
              </div>
            </div>
          ))}
        </Tab.Panel>
        <Tab.Panel>
          {recipePost?.map((p) => (
            <div key={p.postId} className="px-6 mb-5">
              <hr className="border-mono50 mx-8 mb-6 border-[1px]" />
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
                  <div className="space-x-[10px]">
                    <span>{p.category}게시판</span>
                    <span>|</span>
                    <span>{p.writtenDate}</span>
                  </div>
                  <Link legacyBehavior href={`/communityPage/${p.postId}`}>
                    <a className="text-2xl font-semibold">{p.title}</a>
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
            <div key={p.postId} className="px-6 mb-5">
              <hr className="border-border mx-8 mb-6 border-[1px]" />
              <div className="pl-8 space-x-[20px] items-center flex">
                <div className="flex flex-col">
                  <div className="text-2xl font-semibold mb-4">
                    <Link legacyBehavior href={`/communityPage/${p.boardId}`}>
                      <a>{p.comment}</a>
                    </Link>
                  </div>
                  {/* postId === boardId */}
                  {/* map............ */}
                  {communityList.map(
                    (item) =>
                      item.id === p.boardId && (
                        <div key={item.id}>
                          <div className="space-x-[10px] text-mono70">
                            <span>
                              {item.category}
                              게시판
                            </span>
                            {/* <span>|</span>
                            <span>{item.writtenDate}</span> */}
                          </div>
                          <div className="text-mono70">{item.title}</div>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          ))}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default MyTabs;
