import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import MyBookmarkTab from "./MyBookmarkTab";
import MyRecipeTab from "./MyRecipeTab";
import MyCommunityTab from "./MyCommunityTab";
import MyCommentTab from "./MyCommentTab";
import { cls } from "../../util";
const MyTabs = ({ userInfo, storageCurrentUser }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
    });

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
    if (isLoading) {
        return <></>;
    }
    return (
        <Tab.Group>
            <Tab.List className="flex space-x-16 ml-[370px] bg-white">
                {storageCurrentUser.uid === userInfo.userId ? (
                    <>
                        {categoriesOfmine.map((category) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    cls(
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
                                    cls(
                                        "w-fit pt-7 pb-[15px] text-[18px] font-medium leading-5 text-mono100 border-[3px] border-x-0  border-white",
                                        "ring-white ring-opacity-60 focus:outline-none focus:ring-2",
                                        selected
                                            ? "bg-white  border-b-brand100  border-b-[3px] font-bold"
                                            : " hover:bg-white/[0.12]"
                                    )
                                }
                            >
                                <span className="mr-1">
                                    {userInfo?.userNickname}
                                </span>
                                {category}
                            </Tab>
                        ))}
                    </>
                )}
            </Tab.List>
            <Tab.Panels className="w-[880px] h-full min-h-[501px] mt-8 mb-[100px] shadow-xl m-auto ">
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
