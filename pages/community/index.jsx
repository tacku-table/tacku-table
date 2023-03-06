import { useEffect, useState } from "react";
import Link from "next/link";
import CommunityTabs from "../../components/communityPage/CommunityTabs";
import SliderScreen from "../../components/communityPage/SliderScreen";

const Community = () => {
  const [storageCurrentUser, setStorageCurrentUser] = useState({});

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("User")) || "";
    if (currentUser) {
      setStorageCurrentUser(currentUser);
    } else {
      setStorageCurrentUser("logout");
    }
  }, []);

  return (
    <div className="flex w-[860px] m-auto flex-col items-center font-medium ">
      <div>
        <h4 className="w-full text-2xl font-bold mx-4 my-5">커뮤니티</h4>
        <SliderScreen />
      </div>
      <CommunityTabs />
      {storageCurrentUser !== "logout" && (
        <div className="flex w-full justify-end ">
          <Link
            href="/community/new"
            className="flex w-[100px] h-[35px] text-white bg-brand100 px-4 my-10 items-center justify-center rounded-sm"
          >
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
            <p>글쓰기</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Community;
