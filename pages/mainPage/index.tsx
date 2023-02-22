import BestRecipe from "@/components/main/bestRecipe";
import GoToCommunity from "@/components/main/goToCommunity";
import NewRecipe from "@/components/main/newRecipe";
import Slider from "@/components/main/Slider";
import Special from "@/components/main/Special";
import Video from "@/components/main/video";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

const MainPage = () => {
    const [text, setText] = useState("");
    const searchTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };
    const router = useRouter();
    const deliverKeyword = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push({
            pathname: "/searchPage",
            query: { keyword: text },
        });
    };

    return (
        <div className="w-full">
            <Video />
            <Slider />
            <div className="py-20 pb-[115px] flex flex-col items-center">
                <form
                    className="relative mt-4 mb-24 flex"
                    onSubmit={deliverKeyword}
                >
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
                <BestRecipe />
                <NewRecipe />
            </div>
            <GoToCommunity />
            <Special />
        </div>
    );
};

export default MainPage;
