import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { dbService } from "@/config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import Image from "next/image";
import { toast } from "react-toastify";
import Post from "./Post";
import EmptyPost from "./EmptyPost";
import { getMyBookmark } from "../../api/firedb";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { Success, Warn, Error } from "../toastify/Alert";
import Loading from "../loding/Loding";

const MyBookmarkTab = ({
  userInfo,
  storageCurrentUser,
}: {
  userInfo: TUserInfo | undefined;
  storageCurrentUser: User | undefined;
}) => {
  const queryClient = useQueryClient();

  const [isLoadings, setIsLoadings] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoadings(false);
    }, 500);
  });

  const {
    isLoading,
    data: bookmarkPost,
    isError,
  } = useQuery(["bookmark", userInfo?.userId], () =>
    getMyBookmark(userInfo?.userId as string)
  );

  if (isLoading) return <Loading />;
  if (isError) return <div>데이터를 가져오지 못했습니다.</div>;

  const handleDeleteBookmark = async (p: any) => {
    const userConfirm = window.confirm("즐겨찾기 레시피를 삭제하시겠습니까?");
    if (userConfirm) {
      try {
        await deleteDoc(
          doc(
            dbService,
            `user/${storageCurrentUser?.uid}/bookmarkPost`,
            p.postId
          )
        );
        getMyBookmark(userInfo?.userId as string);
        Success("삭제되었습니다");
      } catch (error: any) {
        Error("삭제에 실패하였습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <Tab.Panel className="pb-6 w-full h-[80%]">
      {bookmarkPost?.length === 0 && <EmptyPost />}
      {bookmarkPost?.map((p) => (
        <div key={p.postId} className="py-6 px-1 sm:p-6">
          <hr className="border-mono50 mx-8 mb-6 border-[1px]" />
          <div className="sm:space-x-[20px] space-x-4 items-center flex">
            {p.thumbnail && (
              <div
                onClick={() => {
                  location.href = `/detailRecipe/${p.postId}`;
                }}
              >
                <Image
                  className="w-[180px] h-[135px] object-cover aspect-[4/3] rounded-md cursor-pointer"
                  src={p.thumbnail}
                  priority={true}
                  loader={({ src }) => src}
                  width={180}
                  height={135}
                  alt="bookmark-thumbnail"
                />
              </div>
            )}
            <div className="flex flex-col">
              <div className="flex space-x-1 w-full text-xs sm:text-base text-mono100">
                <span>#{p.animationTitle}</span>
                <span>#{p.cookingTime}</span>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  location.href = `/detailRecipe/${p.postId}`;
                }}
              >
                <span className="text-lg sm:text-[24px] font-semibold">
                  {p.foodTitle}
                </span>
              </div>
            </div>
          </div>
          <div className="flex mt-6 ml-5 sm:mt-9 sm:ml-8 space-x-3 relative items-center">
            <Post writerUid={p.writerUid} />
            {storageCurrentUser?.uid === userInfo?.userId && (
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
