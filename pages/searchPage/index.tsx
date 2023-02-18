import { dbService } from "@/config/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Fuse from "fuse.js";
import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const SearchData: NextPage = () => {
    const [text, setText] = useState("");
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
            orderBy("createdAt", "desc")
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
        getList();
    }, []);

    return (
        <div className="w-full mt-20 flex flex-col justify-center items-center">
            <div className="relative flex justify-center">
                <div className="bg-main hover:bg-gradient-to-bl font-medium rounded-lg rounded-r-none text-white text-sm px-5 py-[10.5px] text-center">
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
                <li className="w-[87px] h-[35px] border border-border border-collapse hover:bg-main text-baseText hover:text-white flex justify-center items-center cursor-pointer">
                    추천순
                </li>
                <li className="w-[87px] h-[35px] border border-border border-collapse hover:bg-main text-baseText hover:text-white flex justify-center items-center cursor-pointer">
                    최신순
                </li>
            </ul>
            <div className="w-3/4 border-b border-border mb-[30px]"></div>
            <div className="w-3/4 flex justify-center mb-20">
                <div className="grid grid-cols-3 gap-5 gap-y-14">
                    {dataResults?.map((item) => {
                        return (
                            <div key={item.id}>
                                <div className="bg-slate-100 w-[316px] h-[188px] overflow-hidden mx-auto">
                                    <img
                                        src={`${item.thumbnail}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <ul className="text-sm text-slate-500 space-x-2 flex">
                                    <li>{item.foodCategory}</li>
                                    <li>{item.ingredient}</li>
                                </ul>
                                <p className="text-lg text-slate-900 font-semibold">
                                    {item.foodTitle}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SearchData;
