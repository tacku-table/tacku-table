import { useEffect, useState } from "react";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { dbService } from "@/config/firebase";
import Link from "next/link";
import CommunityTabs from "../../components/tabs/CommunityTabs";
import SliderScreen from "../../components/community/SliderScreen";

const Community = () => {
  return (
    <div className="flex flex-col items-center my-10">
      <SliderScreen />
      <CommunityTabs />
      <div className="flex w-[870px] justify-end">
        <div className="flex w-36 h-11 text-white bg-brand100 my-10 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          <Link href="/communityPage/new">글 작성하기</Link>
        </div>
      </div>
    </div>
  );
};

export default Community;
