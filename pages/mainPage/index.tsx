import BestRecipe from "@/components/main/BestRecipe";
import GoToCommunity from "@/components/main/GoToCommunity";
import NewRecipe from "@/components/main/NewRecipe";
import Slider from "@/components/main/Slider";
import Video from "@/components/main/video";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

const MainPage = () => {
    const [text, setText] = useState("");
    const searchTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };
    const router = useRouter();
    const deliverKeyword = () => {
        router.push({
            pathname: "/searchPage",
            query: { keyword: text },
        });
    };

    return (
        <div className="w-full">
            <Video />
            <div className="relative flex flex-col h-16 justify-center items-center bg-teal-200 overflow-hidden"></div>
            <div className="h-[1500px] py-20 flex flex-col items-center">
                <div className="relative mt-4 mb-7">
                    <input
                        type="text"
                        value={text}
                        onChange={searchTextHandler}
                        className="w-[300px] text-sm font-medium px-5 py-2.5 pl-11 focus:outline-none rounded-lg rounded-r-none border border-slate-300"
                        placeholder="하울 정식"
                    ></input>
                    <button
                        type="button"
                        onClick={deliverKeyword}
                        className="bg-main hover:bg-gradient-to-bl hover:transition-all focus:ring-4 focus:outline-none focus:ring-orange-100 font-medium rounded-lg rounded-l-none text-white text-sm px-5 py-[10.5px] text-center"
                    >
                        레시피검색
                    </button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-slate-300 absolute top-2.5 ml-3 pointer-events-none"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </div>
                <BestRecipe />
                <NewRecipe />
            </div>
            <GoToCommunity />
            <div className="h-[500px] bg-red-200 messageFadeIn">보너스</div>
            <Slider />
        </div>
    );
};

export default MainPage;
