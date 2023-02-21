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

    // 인기순,최신순
    const [isBest, setIsBest] = useState(false);
    const activeBestBtn = () => {
        setIsBest(true);
        console.log(isBest);
    };
    const inactiveBestBtn = () => {
        setIsBest(false);
        console.log(isBest);
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
            orderBy(isBest ? "viewCount" : "createdAt", "desc")
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
                        isBest ? "bg-main text-white" : "text-grayText"
                    )}
                    onClick={activeBestBtn}
                >
                    인기순
                </li>
                <li
                    className={cls(
                        "sorted-btn",
                        !isBest ? "bg-main text-white" : "text-grayText"
                    )}
                    onClick={inactiveBestBtn}
                >
                    최신순
                </li>
            </ul>
            {dataResults ? (
                <p className="w-3/4 mb-4 text-gray-400">
                    총&nbsp;
                    <span className="text-red-400">{dataResults.length}</span>
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
