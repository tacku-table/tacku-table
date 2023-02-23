import { dbService } from "@/config/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Fuse from "fuse.js";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
    ChangeEvent,
    FormEvent,
    useCallback,
    useEffect,
    useState,
} from "react";
import RecipeData from "@/components/search/RecipeData";
import ChangeSortedBtn from "@/components/search/ChangeSortedBtn";
import SideFoodCate from "@/components/search/SideFoodCate";
import SideCookingTime from "@/components/search/SideCookingTime";

const SearchData: NextPage = () => {
    const router = useRouter();
    const deliverKeyword = router.query.keyword;

    const [isBest, setIsBest] = useState("");
    const [filtered, setFiltered] = useState<string[] | "">("");

    // 인기순
    const activeBestBtn = () => {
        // 인기순 버튼을 클릭하면 sessionStorge에 viewCount라는 이름으로 데이터 저장
        // key : userWatching , value : "viewCount"
        sessionStorage.setItem("userWatching", "viewCount");
        // state도 똑같은 값으로 업데이트---------------------
        setIsBest("viewCount");
    };

    // 최신순
    const inactiveBestBtn = () => {
        // 최신순 버튼을 클릭하면 sessionStorge에 "createdAt"라는 이름으로 데이터 저장
        // key : userWatching , value : "createdAt"
        // setIsBest(false);
        sessionStorage.setItem("userWatching", "createdAt");
        // state도 똑같은 값으로 업데이트---------------------
        setIsBest("createdAt");
    };

    const [text, setText] = useState(deliverKeyword || "");
    const searchTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    // 카테고리필터링(음식종류)
    const [checkedList, setCheckedList] = useState<Array<string>>([]);

    const onCheckedItem = useCallback(
        (checked: boolean, newItem: string) => {
            if (checked) {
                setCheckedList((prev) => [...prev, newItem]);
                sessionStorage.setItem(
                    "filteredData",
                    JSON.stringify([...checkedList, newItem])
                );
                setFiltered(checkedList);
            } else if (!checked) {
                setCheckedList(checkedList.filter((ele) => ele !== newItem));
                sessionStorage.setItem(
                    "filteredData",
                    JSON.stringify(checkedList.filter((ele) => ele !== newItem))
                );
                setFiltered(checkedList);
            }
        },
        [checkedList]
    );
    // 카테고리필터링(조리시간)
    const [checkedList2, setCheckedList2] = useState<Array<string>>([]);

    const onCheckedItem2 = useCallback(
        (checked: boolean, item: string) => {
            if (checked) {
                setCheckedList2((prev) => [...prev, item]);
            } else if (!checked) {
                setCheckedList2(checkedList2.filter((ele) => ele !== item));
            }
        },
        [checkedList2]
    );

    // 전체목록불러오기
    const [currentItems, setCurrentItems] = useState<RecipeProps[]>([]);

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
        keys: ["animationTitle", "foodTitle", "content"],
        includeScore: true,
    });
    // @ts-ignore
    const results = fuse.search(text);
    const dataResults = text
        ? results.map((recipe) => recipe.item)
        : currentItems;

    useEffect(() => {
        const result = sessionStorage.getItem("userWatching");
        const filteredResults = JSON.parse(
            sessionStorage.getItem("filteredData") || ""
        );

        if (result) {
            setIsBest(result);
        } else {
            setIsBest("createdAt");
        }
        if (filteredResults) {
            setFiltered(filteredResults);
        } else {
            setFiltered("");
        }

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
            <ChangeSortedBtn
                dataResults={dataResults}
                isBest={isBest}
                activeBestBtn={activeBestBtn}
                inactiveBestBtn={inactiveBestBtn}
                checkedList={checkedList}
                checkedList2={checkedList2}
            />
            <div className="w-4/5 border-b border-border mb-[30px]"></div>
            <div className="w-4/5 flex justify-between gap-7 mb-20">
                <div className="flex flex-col">
                    <SideFoodCate
                        categoryList={categoryList}
                        onCheckedItem={onCheckedItem}
                        filtered={filtered}
                    />
                    <SideCookingTime
                        categoryList2={categoryList2}
                        onCheckedItem2={onCheckedItem2}
                    />
                </div>
                <RecipeData
                    dataResults={dataResults}
                    checkedList={checkedList}
                    checkedList2={checkedList2}
                />
            </div>
        </div>
    );
};

export default SearchData;

const categoryList = [
    { name: "밥&도시락&면" },
    { name: "국&탕&찌개" },
    { name: "구이&볶음&찜" },
    { name: "튀김류" },
    { name: "베이커리&디저트" },
    { name: "음료&주류" },
    { name: "식단&건강관리" },
];
const categoryList2 = [
    { name: "15분이하" },
    { name: "30분이하" },
    { name: "1시간이하" },
    { name: "1시간이상" },
];
