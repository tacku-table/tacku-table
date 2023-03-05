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
import useGetCommunityPost from "@/hooks/useGetCommunityPost";
const AllListTab = () => {
  const [communityList, setCommunityList] = useState<any[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1); //default=현재 페이지번호
  const offset = (page - 1) * limit;

  const { communityPost } = useGetCommunityPost();
  useEffect(() => {
    setCommunityList(communityPost);
  }, [communityPost]);

  const getUserInfoInUserCollection = async (uid: string) => {
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
  };

  return (
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
              <div className="border-r border-mono60 pr-3">{p.category}</div>
              <div className="border-r border-mono60 px-3">{p.writtenDate}</div>
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
  );
};

export default AllListTab;
