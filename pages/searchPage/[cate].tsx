import { dbService } from "@/config/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Fuse from "fuse.js";
import RecipeData from "@/components/search/RecipeData";
import ChangeSortedBtn from "@/components/search/ChangeSortedBtn";

// 카테고리별 불러오기
const ClassifiedRecipe: NextPage = () => {
    const [isBest, setIsBest] = useState("");
    // 인기순
    const activeBestBtn = () => {
        sessionStorage.setItem("userWatching", "viewCount");
        setIsBest("viewCount");
    };

    // 최신순
    const inactiveBestBtn = () => {
        sessionStorage.setItem("userWatching", "createdAt");
        setIsBest("createdAt");
    };

    const [text, setText] = useState("");
    const searchTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    // 목록불러오기
    const [currentItems, setCurrentItems] = useState<RecipeProps[]>([]);

    const router = useRouter();

    const getList = async () => {
        const items = query(
            collection(dbService, "recipe"),
            orderBy(isBest === "viewCount" ? "viewCount" : "createdAt", "desc"),
            where(
                `${
                    router.query.cate === "15분이하" ||
                    router.query.cate === "30분이하" ||
                    router.query.cate === "1시간이하" ||
                    router.query.cate === "1시간이상"
                        ? "cookingTime"
                        : "foodCategory"
                }`,
                "==",
                `${router.query.cate}`
            )
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
    const results = fuse.search(text);
    const dataResults = text
        ? results.map((recipe) => recipe.item)
        : currentItems;

    useEffect(() => {
        const result = sessionStorage.getItem("userWatching");
        if (result) {
            setIsBest(result);
        } else {
            setIsBest("createdAt");
        }
        getList();
    }, [router.query.cate, isBest]);

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
            <ChangeSortedBtn
                dataResults={dataResults}
                isBest={isBest}
                activeBestBtn={activeBestBtn}
                inactiveBestBtn={inactiveBestBtn}
            />
            <div className="w-4/5 border-b border-border mb-[30px]"></div>
            <div className="w-4/5 flex justify-between mb-20">
                <div className="bg-mono30 rounded-[3px] w-auto h-9 px-6 mr-7 text-sm flex items-center text-brand100">
                    {router.query.cate?.toString().replaceAll("&", "/")}
                </div>
                <RecipeData dataResults={dataResults} />
            </div>
        </div>
    );
};

export default ClassifiedRecipe;
