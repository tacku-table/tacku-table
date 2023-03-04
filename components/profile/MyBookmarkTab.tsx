import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { authService, dbService } from "@/config/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import defaultImg from "../../public/images/test1.png";
import { toast } from "react-toastify";

const MyBookmarkTab = ({ userInfo, storageCurrentUser }: any) => {
  const [bookmarkPost, setBookmarkPost] = useState<any[]>([]);

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }
  const toastAlert = (alertText: any) => {
    toast(`${alertText}`, {
      position: "top-right",
      autoClose: 1300,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    getMyBookmark(userInfo.userId);
  }, [bookmarkPost]);

  const getMyBookmark = async (userId: any) => {
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
  const handleDeleteBookmark = async (p: any) => {
    const userConfirm = window.confirm("즐겨찾기 레시피를 삭제하시겠습니까?");
    if (userConfirm) {
      try {
        await deleteDoc(
          doc(
            dbService,
            `user/${storageCurrentUser.uid}/bookmarkPost`,
            p.postId
          )
        );
        getMyBookmark(userInfo.userId);
        toastAlert("🗑 삭제되었습니다");
      } catch (error: any) {
        toast.error("삭제에 실패하였습니다. 다시 시도해주세요.", error);
      }
    }
  };

  return (
    <Tab.Panel className="pt-[91px] pb-6">
      {bookmarkPost?.map((p) => (
        <div key={p.postId} className="px-6 mb-5">
          <hr className="border-mono50 mx-8 mb-6 border-[1px]" />
          <div className="pl-8 space-x-[20px] items-center flex">
            {p.thumbnail && (
              <Image
                className="object-cover aspect-[4/3]"
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
          <div className="flex mt-9 ml-8 space-x-3 relative items-center">
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
            {storageCurrentUser.uid === userInfo.userId && (
              <svg
                className="w-6 h-6 absolute right-8 cursor-pointer hover:text-brand100"
                onClick={() => {
                  handleDeleteBookmark(p);
                }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                ></path>
              </svg>
            )}
          </div>
        </div>
      ))}
    </Tab.Panel>
  );
};

export default MyBookmarkTab;
