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
    let deliverSorted = router.query.sortedBest;
    console.log(deliverSorted);

    // 인기순,최신순
    const [isBest, setIsBest] = useState(Boolean);
    const activeBestBtn = () => {
        setIsBest(true);
    };
    const inactiveBestBtn = () => {
        setIsBest(false);
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
            <form className="relative mt-4 mb-16 flex" onSubmit={submitHandler}>
                <input
                    type="text"
                    value={text}
                    onChange={searchTextHandler}
                    className="w-[300px] h-[50px] text-sm font-medium pl-7 focus:outline-none rounded-[5px] rounded-r-none border border-slate-300"
                    placeholder="하울의 움직이는 성 베이컨계란요리"
                ></input>
                <button
                    type="submit"
                    className="bg-main rounded-[5px] rounded-l-none w-[50px] h-[50px] text-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-white absolute top-3 ml-3 pointer-events-none"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            </form>
            <div className="w-3/4 flex justify-end items-center mb-[20px]">
                {dataResults ? (
                    <p className=" text-mono100 mr-[280px]">
                        총&nbsp;
                        <span className="text-red100">
                            {dataResults.length}
                        </span>
                        건의 레시피가 기다리고 있어요!
                    </p>
                ) : null}{" "}
                <ul className="flex justify-end">
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
            </div>
            <div className="w-3/4 border-b border-border mb-[30px]"></div>
            <div className="w-3/4 flex justify-start gap-7 mb-20">
                <SideCategory />
                <RecipeData dataResults={dataResults} />
            </div>
        </div>
    );
};

export default SearchData;
