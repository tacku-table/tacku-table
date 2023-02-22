import SideCategory from "@/components/search/SideCategory";
import { dbService } from "@/config/firebase";
import { cls } from "@/util";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import Fuse from "fuse.js";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import RecipeData from "@/components/search/RecipeData";

const SearchData: NextPage = () => {
  const router = useRouter();
  const deliverKeyword = router.query.keyword;

  //---------------------다경 추가(시작)--------------------------
  useEffect(() => {
    console.log("맨 처음에 isBest?", isBest);
    if (sessionStorage.getItem("userWatching")) {
      console.log("유저가 보고있던게 있어요");
      const result = sessionStorage.getItem("userWatching");
      console.log("result:", result);
      console.log("result의 타입", typeof result);

      if (result) {
        setIsBest(result);
      }
    } else {
      setIsBest("createdAt");
    }
  }, []);

  //---------------------다경 추가(끝)--------------------------

  // 인기순,최신순
  // const [isBest, setIsBest] = useState(false);
  // 다경: useState를 "" 로 처음 초기세팅
  const [isBest, setIsBest] = useState("");

  // 인기순
  const activeBestBtn = () => {
    // 인기순 버튼을 클릭하면 sessionStorge에 viewCount라는 이름으로 데이터 저장
    // key : userWatching , value : "viewCount"
    sessionStorage.setItem("userWatching", "viewCount");
    // state도 똑같은 값으로 업데이트---------------------
    setIsBest("viewCount");
    // state도 똑같은 값으로 업데이트---------------------
    // setIsBest(true);
    console.log("isBest:", isBest);
  };

  // 최신순
  const inactiveBestBtn = () => {
    // 최신순 버튼을 클릭하면 sessionStorge에 "createdAt"라는 이름으로 데이터 저장
    // key : userWatching , value : "createdAt"

    // setIsBest(false);
    sessionStorage.setItem("userWatching", "createdAt");
    // state도 똑같은 값으로 업데이트---------------------
    setIsBest("createdAt");
    // state도 똑같은 값으로 업데이트---------------------

    console.log("isBest:", isBest);
  };

  const [text, setText] = useState(deliverKeyword || "");
  const searchTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // 전체목록불러오기
  const [currentItems, setCurrentItems] = useState<RecipeProps[]>([]);

  const getList = async () => {
    const items = query(
      collection(dbService, "recipe"),
      // isBest가 true이면 viewCount 아니면 createdAt
      // 다경 : isBest가 viewCount면 viewCount, createdAt이면 createdAt----------------(시작)
      orderBy(isBest === "viewCount" ? "viewCount" : "createdAt", "desc")
      // 다경 : isBest가 viewCount면 viewCount, createdAt이면 createdAt----------------(끝)
      //   orderBy(isBest ? "viewCount" : "createdAt", "desc")
      // where("foodCategory", "==", "desc")
    );
    const querySnapshot = await getDocs(items);
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setCurrentItems(newData);
  };

  // 검색
  const fuse = new Fuse(currentItems, {
    keys: ["animationTitle", "foodTitle", "content"],
    includeScore: true,
  });
  // @ts-ignore
  const results = fuse.search(text);
  const dataResults = text
    ? results.map((recipe) => recipe.item)
    : currentItems;

  useEffect(() => {
    getList();
  }, [isBest]);

  return (
    <div className="w-full mt-20 flex flex-col justify-center items-center">
      <div className="relative flex justify-center">
        <div className="bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg rounded-r-none text-white text-sm px-5 py-[10.5px] text-center">
          레시피검색
        </div>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={text}
            onChange={searchTextHandler}
            className="w-[300px] text-sm font-medium px-5 py-2.5 pl-4 focus:outline-none rounded-lg rounded-l-none border border-slate-300"
          ></input>
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-slate-300 absolute top-2.5 -ml-[40px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </form>
      </div>
      <ul className="w-3/4 flex justify-end mb-[20px]">
        <li
          className={cls(
            "sorted-btn",
            // isBest ? "bg-main text-white" : "text-grayText"
            // 다경 수정코드---------(시작)
            isBest === "viewCount" ? "bg-main text-white" : "text-grayText"
            // 다경 수정코드---------(끝)
          )}
          onClick={activeBestBtn}
        >
          인기순
        </li>
        <li
          className={cls(
            "sorted-btn",
            // !isBest ? "bg-main text-white" : "text-grayText"
            // 다경 수정코드---------(시작)
            isBest === "createdAt" ? "bg-main text-white" : "text-grayText"
            // 다경 수정코드---------(끝)
          )}
          onClick={inactiveBestBtn}
        >
          최신순
        </li>
      </ul>
      {dataResults ? (
        <p className="w-3/4 mb-4 text-gray-400">
          총 <span className="text-red-400">{dataResults.length}</span>
          건의 레시피가 기다리고 있어요!
        </p>
      ) : null}
      <div className="w-3/4 border-b border-border mb-[30px]"></div>
      <div className="w-3/4 flex justify-start gap-7 mb-20">
        <SideCategory />
        <RecipeData dataResults={dataResults} />
      </div>
    </div>
  );
};

export default SearchData;
