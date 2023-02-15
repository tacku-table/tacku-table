import type { NextPage } from "next";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { dbService } from "@/config/firebase";
import { useEffect, useState } from "react";

interface RecipeProps {
    id?: string | number;
    uid?: string;
    animationTitle?: string;
    foodTitle?: string;
    ingredient?: string;
    cookingTime?: string;
    foodCategory?: string;
    displayStatus?: string;
    thumbnail?: string;
    createdAt?: string | number;
    content?: string;
    children?: JSX.Element | JSX.Element[];
}

const SearchPage: NextPage = () => {
    const [currentItems, setCurrentItems] = useState<RecipeProps[]>([]);

    useEffect(() => {
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
            console.log(newData);
        };
        getList();
    }, []);

    return (
        <div className="w-full h-screen flex justify-center">
            <div>
                {/* 검색바 */}
                <div className="relative mt-4 mb-7 flex justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-slate-300 absolute top-2.5 -ml-[360px] pointer-events-none"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                    <input
                        type="text"
                        className="w-[300px] text-sm font-medium px-5 py-2.5 pl-11 focus:outline-none rounded-lg rounded-r-none border border-slate-300"
                    ></input>
                    <button
                        type="button"
                        className="bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg rounded-l-none text-white text-sm px-5 py-[10.5px] text-center"
                    >
                        레시피검색
                    </button>
                </div>
                {/* 검색결과 */}
                <div className="grid grid-cols-3 gap-3">
                    {currentItems?.map((item) => {
                        return (
                            <div key={item.id} className="mr-7 mb-16">
                                <div className="bg-slate-100 w-72 h-56 overflow-hidden mx-auto">
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

export default SearchPage;
