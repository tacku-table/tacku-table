import { dbService } from "@/config/firebase";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
} from "firebase/firestore";
import Fuse from "fuse.js";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import RecipeList from "@/components/search/RecipeList";
import ChangeSortedBtn from "@/components/search/ChangeSortedBtn";
import SideFoodCate from "@/components/search/SideFoodCate";
import SideCookingTime from "@/components/search/SideCookingTime";
import { FieldErrors, useForm } from "react-hook-form";
import { cls } from "@/util";

const SearchData: NextPage = () => {
    const router = useRouter();
    const deliverKeyword = router.query.keyword;
    const [text, setText] = useState(deliverKeyword?.toString() || "");
    const [isBest, setIsBest] = useState("");
    const [filteredFood, setFilteredFood] = useState<string[]>([]);
    const [filteredTime, setFilteredTime] = useState<string[]>([]);
    const [currentItems, setCurrentItems] = useState<RecipeProps[]>([]);
    const [totalItems, setTotalItems] = useState<RecipeProps[]>([]);
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
                orderBy("createdAt", "desc"),
                startAfter(lastDoc),
                limit(6)
            )
        );
        updateState(querySnapshot);
    };
    // 전체목록불러오기
    const getList = async () => {
        const items = query(
            collection(dbService, "recipe"),
            orderBy(isBest === "viewCount" ? "viewCount" : "createdAt", "desc")
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
        keys: [
            { name: "animationTitle", weight: 0.5 },
            { name: "foodTitle", weight: 0.3 },
            { name: "content", weight: 0.2 },
        ],
        includeScore: true,
    });
    const results = fuse.search(text);
    const dataResults = results.map((recipe) => recipe.item);

    // 카테고리필터링(음식종류)
    const onCheckedFood = useCallback(
        (checked: boolean, newItem: string) => {
            if (checked) {
                sessionStorage.setItem(
                    "filteredFoodData",
                    JSON.stringify([...filteredFood, newItem])
                );
                setFilteredFood([...filteredFood, newItem]);
            } else if (!checked) {
                sessionStorage.setItem(
                    "filteredFoodData",
                    JSON.stringify(
                        filteredFood.filter((ele) => ele !== newItem)
                    )
                );
                setFilteredFood(filteredFood.filter((ele) => ele !== newItem));
            }
        },
        [filteredFood]
    );
    // 카테고리필터링(조리시간)
    const onCheckedTime = useCallback(
        (checked: boolean, newItem: string) => {
            if (checked) {
                sessionStorage.setItem(
                    "filteredTimeData",
                    JSON.stringify([...filteredTime, newItem])
                );
                setFilteredTime([...filteredTime, newItem]);
            } else if (!checked) {
                sessionStorage.setItem(
                    "filteredTimeData",
                    JSON.stringify(
                        filteredTime.filter((ele) => ele !== newItem)
                    )
                );
                setFilteredTime(filteredTime.filter((ele) => ele !== newItem));
            }
        },
        [filteredTime]
    );

    useEffect(() => {
        const result = sessionStorage.getItem("userWatching");
        const storeSearchText = sessionStorage.getItem("searchData");
        const storeFilteredFood = JSON.parse(
            sessionStorage.getItem("filteredFoodData")!
        );
        const storeFilteredTime = JSON.parse(
            sessionStorage.getItem("filteredTimeData")!
        );
        result ? setIsBest(result) : setIsBest("createdAt");

        storeSearchText && setText(storeSearchText);
        storeFilteredFood && setFilteredFood(storeFilteredFood);
        storeFilteredTime && setFilteredTime(storeFilteredTime);
        first();
        getList();
    }, [isBest]);

    return (
        <>
            <div className="w-full mt-20 flex flex-col justify-center items-center">
                <form
                    onSubmit={handleSubmit(onValid, onInValid)}
                    className="relative mt-4 mb-16 flex"
                >
                    <input
                        {...register("searchText")}
                        type="text"
                        className="w-[300px] h-[50px] text-sm font-medium pl-7 focus:outline-none rounded-[5px] rounded-r-none border border-slate-300"
                        placeholder="하울의 움직이는 성 베이컨계란요리"
                    ></input>
                    <button
                        type="submit"
                        className="bg-brand100 rounded-[5px] rounded-l-none w-[50px] h-[50px] text-center"
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
                    deliverKeyword={deliverKeyword}
                    text={text}
                    currentItems={currentItems}
                    dataResults={dataResults}
                    isBest={isBest}
                    activeBestBtn={activeBestBtn}
                    inactiveBestBtn={inactiveBestBtn}
                    filteredFood={filteredFood}
                    filteredTime={filteredTime}
                />
                <div className="w-4/5 border-b border-mono70 mb-[30px]"></div>
                <div className="w-4/5 flex justify-between mb-20">
                    <div className="flex flex-col mr-3">
                        <SideFoodCate
                            onCheckedFood={onCheckedFood}
                            filteredFood={filteredFood}
                        />
                        <div className="w-full border border-mono50 my-4"></div>
                        <SideCookingTime
                            onCheckedTime={onCheckedTime}
                            filteredTime={filteredTime}
                        />
                    </div>
                    <RecipeList
                        text={text}
                        currentItems={currentItems}
                        totalItems={totalItems}
                        dataResults={dataResults}
                        filteredFood={filteredFood}
                        filteredTime={filteredTime}
                    />
                </div>
            </div>
            <div className="w-full flex justify-center items-center mb-[30px]">
                <button
                    type="button"
                    onClick={next}
                    className={cls(
                        "border-[2px] text-brand100 border-brand100 px-7 py-1",
                        !lastDoc ||
                            text ||
                            filteredFood?.length ||
                            filteredTime?.length
                            ? "hidden"
                            : ""
                    )}
                >
                    더보기
                </button>
            </div>
        </>
    );
};

export default SearchData;
