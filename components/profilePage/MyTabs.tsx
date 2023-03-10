import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import MyBookmarkTab from "./MyBookmarkTab";
import MyRecipeTab from "./MyRecipeTab";
import MyCommunityTab from "./MyCommunityTab";
import MyCommentTab from "./MyCommentTab";
import { cls } from "../../util";
import { User } from "firebase/auth";

interface MyTabsProp {
  userInfo: TUserInfo | undefined;
  storageCurrentUser: User | undefined;
}

const MyTabs = ({ userInfo, storageCurrentUser }: MyTabsProp) => {
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
  //   if (isLoading) {
  //     return <></>;
  //   }
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-6 sm:space-x-16 justify-center items-center bg-white mx-auto">
        {storageCurrentUser?.uid === userInfo?.userId ? (
          <>
            {categoriesOfmine.map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  cls(
                    "pt-5 pb-3 sm:pt-7 sm:pb-[15px] text-xs sm:text-[18px] font-medium leading-5 text-mono100 border-[3px] border-x-0  border-white",
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
                  cls(
                    "pt-5 pb-3 sm:pt-7 sm:pb-[15px] text-xs sm:text-[18px] font-medium leading-5 text-mono100 border-[3px] border-x-0  border-white",
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
      <Tab.Panels className="w-11/12 h-full  md:mt-8 mt-0 mb-[100px] shadow-xl mx-auto ">
        <MyBookmarkTab
          storageCurrentUser={storageCurrentUser}
          userInfo={userInfo}
        />
        <MyRecipeTab userInfo={userInfo} />
        <MyCommunityTab userInfo={userInfo} />
        <MyCommentTab userInfo={userInfo} />
      </Tab.Panels>
    </Tab.Group>
  );
};

export default MyTabs;
