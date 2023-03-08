import { dbService } from "@/config/firebase";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    where,
} from "firebase/firestore";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import RecipeList from "@/components/searchPage/RecipeList";
import ChangeSortedBtn from "@/components/searchPage/ChangeSortedBtn";
import { FieldErrors, useForm } from "react-hook-form";

// 카테고리별 불러오기
const ClassifiedRecipe: NextPage = () => {
    const router = useRouter();
    const [text, setText] = useState("");
    const [isBest, setIsBest] = useState("");
    const [currentItems, setCurrentItems] = useState<TypeRecipe[]>([]);
    const [totalItems, setTotalItems] = useState<TypeRecipe[]>([]);
    const [lastDoc, setLastdoc] = useState(0);

    const { register, handleSubmit, getValues } = useForm();
    const onValid = () => {
        sessionStorage.setItem("searchData", getValues("searchText"));
        setText(getValues("searchText"));
    };
    const onInValid = (errors: FieldErrors) => {
        console.log(errors);
    };

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
    // 전체목록(6개씩)
    const first = async () => {
        const querySnapshot = await getDocs(
            query(
                collection(dbService, "recipe"),
                orderBy(
                    isBest === "viewCount" ? "viewCount" : "createdAt",
                    "desc"
                ),
                where(
                    `${
                        router.query.category === "15분이하" ||
                        router.query.category === "30분이하" ||
                        router.query.category === "1시간이하" ||
                        router.query.category === "1시간이상"
                            ? "cookingTime"
                            : "foodCategory"
                    }`,
                    "==",
                    `${router.query.category}`
                ),
                limit(6)
            )
        );
        const newData = querySnapshot.docs.map((doc: any) => ({
            ...doc.data(),
            id: doc.id,
        }));
        setTotalItems(newData);
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        lastDoc ? setLastdoc(lastDoc as any) : null;
    };
    const updateState = (querySnapshot: any) => {
        const newData = querySnapshot.docs.map((doc: any) => ({
            ...doc.data(),
            id: doc.id,
        }));
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        setTotalItems((prev) => [...prev, ...newData]);
        setLastdoc(lastDoc);
    };
    // 더보기event
    const next = async () => {
        const querySnapshot = await getDocs(
            query(
                collection(dbService, "recipe"),
                orderBy(
                    isBest === "viewCount" ? "viewCount" : "createdAt",
                    "desc"
                ),
                where(
                    `${
                        router.query.category === "15분이하" ||
                        router.query.category === "30분이하" ||
                        router.query.category === "1시간이하" ||
                        router.query.category === "1시간이상"
                            ? "cookingTime"
                            : "foodCategory"
                    }`,
                    "==",
                    `${router.query.category}`
                ),
                startAfter(lastDoc),
                limit(6)
            )
        );
        updateState(querySnapshot);
    };

    // 목록불러오기
    const getList = async () => {
        const items = query(
            collection(dbService, "recipe"),
            orderBy(isBest === "viewCount" ? "viewCount" : "createdAt", "desc"),
            where(
                `${
                    router.query.category === "15분이하" ||
                    router.query.category === "30분이하" ||
                    router.query.category === "1시간이하" ||
                    router.query.category === "1시간이상"
                        ? "cookingTime"
                        : "foodCategory"
                }`,
                "==",
                `${router.query.category}`
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
        keys: ["animationTitle", "foodTitle"],
        includeScore: true,
        threshold: 0.5, //일치정도(0~1.0)
        minMatchCharLength: text.length,
    });
    const results = fuse.search(text);
    const dataResults = results.map((recipe) => recipe.item);

    useEffect(() => {
        const result = sessionStorage.getItem("userWatching");
        const storeSearchText = sessionStorage.getItem("searchData");
        result ? setIsBest(result) : setIsBest("createdAt");
        storeSearchText && setText(storeSearchText);
        first();
        getList();
    }, [router.query.category, isBest]);

    return (
        <div className="w-full mt-20 flex flex-col justify-center items-center">
            <form
                className="relative mt-4 mb-16 flex"
                onSubmit={handleSubmit(onValid, onInValid)}
            >
                <input
                    {...register("searchText")}
                    type="text"
                    className="w-[300px] h-[50px] text-sm font-medium pl-7 focus:outline-none rounded-sm rounded-r-none border border-slate-300"
                    placeholder="하울의 움직이는 성 베이컨계란요리"
                ></input>
                <button
                    type="submit"
                    className="bg-brand100 rounded-sm rounded-l-none w-[50px] h-[50px] text-center"
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
                text={text}
                dataResults={dataResults}
                currentItems={currentItems}
                isBest={isBest}
                activeBestBtn={activeBestBtn}
                inactiveBestBtn={inactiveBestBtn}
            />
            <div className="w-4/5 border-b border-mono50 mb-[30px]"></div>
            <div className="w-4/5 flex justify-between mb-10">
                <div className="bg-mono30 rounded-[3px] w-auto h-9 px-6 mr-7 text-sm flex items-center text-brand100">
                    {router.query.category?.toString().replaceAll("&", "/")}
                </div>
                <RecipeList
                    text={text}
                    next={next}
                    lastDoc={lastDoc}
                    currentItems={currentItems}
                    totalItems={totalItems}
                    dataResults={dataResults}
                />
            </div>
        </div>
    );
};

export default ClassifiedRecipe;
