import { dbService } from "@/config/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { NextPage } from "next";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const SearchRecipeBar: NextPage = () => {
    const [text, setText] = useState("");
    const searchTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="relative flex justify-center">
            <div className="bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 rounded-lg rounded-r-none font-medium rounded-r-none text-white text-sm px-5 py-[10.5px] text-center">
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
    );
};

export default SearchRecipeBar;
