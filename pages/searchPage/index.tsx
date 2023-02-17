import SearchRecipeBar from "@/components/search/SearchRecipeBar";
import TotalRecipe from "@/components/search/TotalRecipe";
import type { NextPage } from "next";

const SearchPage: NextPage = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <SearchRecipeBar />
            <ul className="w-3/4 flex justify-end mb-[20px]">
                <li className="w-[87px] h-[35px] border border-border border-collapse hover:bg-main text-baseText hover:text-white flex justify-center items-center cursor-pointer">
                    추천순
                </li>
                <li className="w-[87px] h-[35px] border border-border border-collapse hover:bg-main text-baseText hover:text-white flex justify-center items-center cursor-pointer">
                    최신순
                </li>
            </ul>
            <div className="w-3/4 border-b border-border mb-[30px]"></div>
            <div className="w-3/4 flex justify-between">
                <div className="bg-slate-100 w-[150px] h-full">카테고리</div>
                <div className="grid grid-cols-3 gap-4">
                    <TotalRecipe />
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
