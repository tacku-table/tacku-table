import { Tab } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import EmptyPost from "./EmptyPost";
import useGetCommunityPost from "@/hooks/useGetCommunityPost";

const MyCommunityTab = ({ userInfo }: MyTabProp) => {
  const [communityList, setCommunityList] = useState<TCommunity[]>([]);

  const { communityPost } = useGetCommunityPost();

  useEffect(() => {
    setCommunityList(() => {
      return communityPost.filter((p) => p?.writterUid === userInfo?.userId);
    });
  }, [communityPost]);

  return (
    <Tab.Panel className="pb-6 w-full h-[80%]">
      {communityList.length === 0 && <EmptyPost />}
      {communityList?.map((p) => (
        <div key={p.id} className="pt-6 px-1 sm:p-6">
          <hr className="border-mono50 mx-8 mb-6 border-[1px]" />
          <div className="pl-8 space-x-4 sm:space-x-[20px] items-center flex">
            <div className="flex flex-col space-y-3">
              <div className="sm:space-x-[10px] flex space-x-1 w-full text-xs sm:text-base text-mono80">
                <span>{p.category}게시판</span>
                <span>|</span>
                <span>{p.writtenDate}</span>
              </div>
              <Link legacyBehavior href={`/community/${p.id}`}>
                <a className="text-lg sm:text-[24px] font-semibold text-mono100">
                  {p.title}
                </a>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </Tab.Panel>
  );
};

export default MyCommunityTab;
